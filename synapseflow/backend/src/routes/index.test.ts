import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';
import { setupRoutes } from './index.js';

describe('API Routes', () => {
  let app: FastifyInstance;
  let mockOrchestrator: any;

  beforeEach(async () => {
    app = Fastify();

    // Create mock orchestrator
    mockOrchestrator = {
      research: vi.fn().mockResolvedValue({
        papers: [
          { id: '1', title: 'Test Paper', authors: ['Author'], year: 2024 },
        ],
        totalResults: 1,
        latency: '100ms',
        agentsUsed: ['PaperScraperAgent'],
      }),
      searchPapers: vi.fn().mockResolvedValue([
        { id: '1', title: 'Result 1', score: 0.95 },
      ]),
      hfInference: {
        featureExtraction: vi.fn().mockResolvedValue([0.1, 0.2, 0.3]),
      },
    };

    // Attach orchestrator to app
    (app as any).orchestrator = mockOrchestrator;

    // Setup routes
    setupRoutes(app);

    await app.ready();
  });

  afterEach(async () => {
    await app.close();
    vi.clearAllMocks();
  });

  describe('POST /api/research', () => {
    it('should execute research query successfully', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/research',
        payload: {
          query: 'transformer models in NLP',
          domains: ['AI', 'NLP'],
          limit: 10,
        },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(true);
      expect(body.data.papers).toBeInstanceOf(Array);
      expect(body.data.totalResults).toBe(1);
      expect(mockOrchestrator.research).toHaveBeenCalledWith({
        query: 'transformer models in NLP',
        domains: ['AI', 'NLP'],
        limit: 10,
      });
    });

    it('should handle minimal query', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/research',
        payload: {
          query: 'AI research',
        },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(true);
      expect(mockOrchestrator.research).toHaveBeenCalledWith({
        query: 'AI research',
      });
    });

    it('should validate query is required', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/research',
        payload: {},
      });

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(false);
      expect(body.error).toBeDefined();
    });

    it('should validate query is not empty', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/research',
        payload: {
          query: '',
        },
      });

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(false);
    });

    it('should validate limit is positive', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/research',
        payload: {
          query: 'test',
          limit: -1,
        },
      });

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(false);
    });

    it('should validate limit max is 1000', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/research',
        payload: {
          query: 'test',
          limit: 1001,
        },
      });

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(false);
    });

    it('should handle orchestrator errors', async () => {
      mockOrchestrator.research.mockRejectedValueOnce(new Error('Service unavailable'));

      const response = await app.inject({
        method: 'POST',
        url: '/api/research',
        payload: {
          query: 'test',
        },
      });

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(false);
      expect(body.error).toBe('Service unavailable');
    });

    it('should accept cross-domain parameter', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/research',
        payload: {
          query: 'test',
          crossDomain: true,
        },
      });

      expect(response.statusCode).toBe(200);
      expect(mockOrchestrator.research).toHaveBeenCalledWith({
        query: 'test',
        crossDomain: true,
      });
    });

    it('should accept self-learning parameter', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/research',
        payload: {
          query: 'test',
          selfLearning: true,
        },
      });

      expect(response.statusCode).toBe(200);
      expect(mockOrchestrator.research).toHaveBeenCalledWith({
        query: 'test',
        selfLearning: true,
      });
    });

    it('should accept date range', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/research',
        payload: {
          query: 'test',
          dateRange: {
            start: '2020-01-01',
            end: '2024-12-31',
          },
        },
      });

      expect(response.statusCode).toBe(200);
      expect(mockOrchestrator.research).toHaveBeenCalledWith({
        query: 'test',
        dateRange: {
          start: '2020-01-01',
          end: '2024-12-31',
        },
      });
    });
  });

  describe('POST /api/search', () => {
    it('should search papers by query', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/search',
        payload: {
          query: 'transformers',
          limit: 10,
        },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(true);
      expect(body.data.query).toBe('transformers');
      expect(body.data.results).toBeInstanceOf(Array);
      expect(body.data.total).toBe(1);
      expect(mockOrchestrator.hfInference.featureExtraction).toHaveBeenCalled();
      expect(mockOrchestrator.searchPapers).toHaveBeenCalled();
    });

    it('should use default limit of 10', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/search',
        payload: {
          query: 'transformers',
        },
      });

      expect(response.statusCode).toBe(200);
      expect(mockOrchestrator.searchPapers).toHaveBeenCalledWith(
        expect.any(Array),
        10
      );
    });

    it('should handle embedding generation errors', async () => {
      mockOrchestrator.hfInference.featureExtraction.mockRejectedValueOnce(
        new Error('Embedding failed')
      );

      const response = await app.inject({
        method: 'POST',
        url: '/api/search',
        payload: {
          query: 'test',
        },
      });

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(false);
      expect(body.error).toBe('Embedding failed');
    });
  });

  describe('POST /api/embeddings', () => {
    it('should generate embeddings for text', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/embeddings',
        payload: {
          text: 'test text',
        },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(true);
      expect(body.data.embedding).toBeInstanceOf(Array);
      expect(body.data.model).toBe('BAAI/bge-m3');
      expect(body.data.latency).toMatch(/\d+ms/);
      expect(mockOrchestrator.hfInference.featureExtraction).toHaveBeenCalledWith({
        model: 'BAAI/bge-m3',
        inputs: 'test text',
      });
    });

    it('should accept custom model', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/embeddings',
        payload: {
          text: 'test text',
          model: 'custom-model',
        },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.data.model).toBe('custom-model');
      expect(mockOrchestrator.hfInference.featureExtraction).toHaveBeenCalledWith({
        model: 'custom-model',
        inputs: 'test text',
      });
    });

    it('should handle embedding errors', async () => {
      mockOrchestrator.hfInference.featureExtraction.mockRejectedValueOnce(
        new Error('Model not found')
      );

      const response = await app.inject({
        method: 'POST',
        url: '/api/embeddings',
        payload: {
          text: 'test',
        },
      });

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(false);
      expect(body.error).toBe('Model not found');
    });
  });

  describe('GET /api/stats', () => {
    it('should return system statistics', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/stats',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(true);
      expect(body.data.totalAgents).toBe(66);
      expect(body.data.mcpTools).toBe(213);
      expect(body.data.uptime).toBeGreaterThan(0);
    });
  });

  describe('Health check', () => {
    beforeEach(async () => {
      // Setup health check route
      app.get('/health', async (request, reply) => {
        return reply.send({ status: 'ok', timestamp: Date.now() });
      });
    });

    it('should respond to health check', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/health',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.status).toBe('ok');
      expect(body.timestamp).toBeGreaterThan(0);
    });
  });
});
