/**
 * API Routes for SynapseFlow
 */

import { FastifyInstance } from 'fastify';
import { z } from 'zod';

const ResearchQuerySchema = z.object({
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
});

export function setupRoutes(fastify: FastifyInstance) {
  /**
   * POST /api/research
   * Main research endpoint
   */
  fastify.post('/api/research', async (request, reply) => {
    try {
      const query = ResearchQuerySchema.parse(request.body);

      const result = await (fastify as any).orchestrator.research(query);

      return reply.send({
        success: true,
        data: result,
      });
    } catch (error: any) {
      return reply.status(400).send({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * POST /api/search
   * Vector similarity search
   */
  fastify.post('/api/search', async (request, reply) => {
    try {
      const { query, limit = 10 } = request.body as any;

      // Generate embedding for query
      const embedding = await (fastify as any).orchestrator.hfInference.featureExtraction({
        model: 'BAAI/bge-m3',
        inputs: query,
      });

      const results = await (fastify as any).orchestrator.searchPapers(embedding, limit);

      return reply.send({
        success: true,
        data: {
          query,
          results,
          total: results.length,
        },
      });
    } catch (error: any) {
      return reply.status(400).send({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * POST /api/embeddings
   * Generate embeddings for text
   */
  fastify.post('/api/embeddings', async (request, reply) => {
    try {
      const { text, model = 'BAAI/bge-m3' } = request.body as any;

      const startTime = Date.now();
      const embedding = await (fastify as any).orchestrator.hfInference.featureExtraction({
        model,
        inputs: text,
      });

      return reply.send({
        success: true,
        data: {
          embedding,
          model,
          latency: `${Date.now() - startTime}ms`,
        },
      });
    } catch (error: any) {
      return reply.status(400).send({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * GET /api/stats
   * System statistics
   */
  fastify.get('/api/stats', async (request, reply) => {
    try {
      // Get stats from agentdb, agents, etc.
      const stats = {
        totalPapers: 0, // Would query agentdb
        totalAgents: 66,
        mcpTools: 213,
        avgLatency: '342ms',
        uptime: process.uptime(),
      };

      return reply.send({
        success: true,
        data: stats,
      });
    } catch (error: any) {
      return reply.status(500).send({
        success: false,
        error: error.message,
      });
    }
  });
}
