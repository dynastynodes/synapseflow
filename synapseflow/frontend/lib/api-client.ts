import axios from 'axios'
import { z } from 'zod'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

// API client instance
export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 120000, // 2 minutes for complex research queries
  headers: {
    'Content-Type': 'application/json',
  },
})

// Schemas for type safety
export const ResearchQuerySchema = z.object({
  query: z.string().min(1),
  domains: z.array(z.string()).optional(),
  dateRange: z
    .object({
      start: z.string(),
      end: z.string(),
    })
    .optional(),
  limit: z.number().int().positive().max(1000).optional(),
  crossDomain: z.boolean().optional(),
  selfLearning: z.boolean().optional(),
})

export const PaperSchema = z.object({
  id: z.string(),
  title: z.string(),
  authors: z.array(z.string()),
  abstract: z.string().optional(),
  year: z.number().optional(),
  citations: z.number().optional(),
  domains: z.array(z.string()).optional(),
  url: z.string().optional(),
  relevanceScore: z.number().optional(),
})

export const ResearchResultSchema = z.object({
  papers: z.array(PaperSchema),
  crossDomainInsights: z.array(z.any()).optional(),
  citationGraph: z.any().optional(),
  timeline: z.array(z.any()).optional(),
  hypotheses: z.array(z.string()).optional(),
  totalResults: z.number(),
  latency: z.string(),
  agentsUsed: z.array(z.string()),
})

export type ResearchQuery = z.infer<typeof ResearchQuerySchema>
export type Paper = z.infer<typeof PaperSchema>
export type ResearchResult = z.infer<typeof ResearchResultSchema>

// API functions
export const api = {
  /**
   * Main research endpoint
   */
  async research(query: ResearchQuery): Promise<ResearchResult> {
    const response = await apiClient.post('/api/research', query)
    return ResearchResultSchema.parse(response.data.data)
  },

  /**
   * Vector similarity search
   */
  async search(query: string, limit: number = 10): Promise<Paper[]> {
    const response = await apiClient.post('/api/search', { query, limit })
    return z.array(PaperSchema).parse(response.data.data.results)
  },

  /**
   * Generate embeddings
   */
  async getEmbeddings(text: string, model: string = 'BAAI/bge-m3'): Promise<number[]> {
    const response = await apiClient.post('/api/embeddings', { text, model })
    return z.array(z.number()).parse(response.data.data.embedding)
  },

  /**
   * Get system statistics
   */
  async getStats(): Promise<{
    totalPapers: number
    totalAgents: number
    mcpTools: number
    avgLatency: string
    uptime: number
  }> {
    const response = await apiClient.get('/api/stats')
    return response.data.data
  },

  /**
   * Health check
   */
  async health(): Promise<{
    status: string
    timestamp: string
    version: string
    agents: any
    database: any
  }> {
    const response = await apiClient.get('/health')
    return response.data
  },
}

// SSE (Server-Sent Events) client for real-time streaming
export class SSEClient {
  private eventSource: EventSource | null = null
  private mcpUrl: string

  constructor() {
    this.mcpUrl = process.env.NEXT_PUBLIC_MCP_URL || 'http://localhost:3001'
  }

  /**
   * Connect to SSE stream for real-time research updates
   */
  connect(
    onMessage: (data: any) => void,
    onError?: (error: Event) => void
  ): void {
    this.eventSource = new EventSource(`${this.mcpUrl}/stream`)

    this.eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        onMessage(data)
      } catch (error) {
        console.error('Failed to parse SSE message:', error)
      }
    }

    this.eventSource.onerror = (error) => {
      console.error('SSE connection error:', error)
      if (onError) onError(error)
      this.disconnect()
    }
  }

  /**
   * Disconnect from SSE stream
   */
  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close()
      this.eventSource = null
    }
  }

  /**
   * Send a research query via SSE
   */
  async sendQuery(query: ResearchQuery): Promise<void> {
    // This would be implemented by the MCP server
    // For now, we'll use the regular API
    await api.research(query)
  }
}

export default api
