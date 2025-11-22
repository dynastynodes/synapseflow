/**
 * SynapseFlow Backend
 * Main orchestration engine using claude-flow and agentic-flow
 */

import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import { config } from './config/index.js';
import { ResearchOrchestrator } from './orchestration/ResearchOrchestrator.js';
import { setupRoutes } from './routes/index.js';
import { logger } from './utils/logger.js';

const fastify = Fastify({
  logger: {
    level: config.logLevel,
  },
});

// Middleware
await fastify.register(cors, {
  origin: config.corsOrigins,
});

await fastify.register(rateLimit, {
  max: config.rateLimit.max,
  timeWindow: config.rateLimit.timeWindow,
});

// Initialize Research Orchestrator
const orchestrator = new ResearchOrchestrator();
await orchestrator.initialize();

// Attach orchestrator to fastify instance
fastify.decorate('orchestrator', orchestrator);

// Setup routes
setupRoutes(fastify);

// Health check
fastify.get('/health', async () => {
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    agents: {
      claude_flow: orchestrator.claudeFlow?.isReady() || false,
      agentic_flow: orchestrator.agenticFlow?.isReady() || false,
      total_agents: 66,
    },
    database: {
      agentdb: orchestrator.agentDB?.isConnected() || false,
      postgres: orchestrator.postgres?.isConnected() || false,
      redis: orchestrator.redis?.isConnected() || false,
      neo4j: orchestrator.neo4j?.isConnected() || false,
    },
  };
});

// Start server
try {
  await fastify.listen({
    port: config.port,
    host: config.host,
  });

  logger.info({
    message: 'SynapseFlow Backend started successfully',
    port: config.port,
    host: config.host,
    environment: config.env,
  });
} catch (err) {
  logger.error('Error starting server:', err);
  process.exit(1);
}

// Graceful shutdown
process.on('SIGINT', async () => {
  logger.info('Graceful shutdown initiated');
  await orchestrator.shutdown();
  await fastify.close();
  process.exit(0);
});
