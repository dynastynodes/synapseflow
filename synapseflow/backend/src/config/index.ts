/**
 * Configuration for SynapseFlow Backend
 */

import dotenv from 'dotenv';
dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '4000', 10),
  host: process.env.HOST || '0.0.0.0',
  logLevel: process.env.LOG_LEVEL || 'info',

  corsOrigins: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],

  rateLimit: {
    max: parseInt(process.env.RATE_LIMIT_MAX || '10000', 10),
    timeWindow: process.env.RATE_LIMIT_WINDOW || '1 day',
  },

  huggingface: {
    apiKey: process.env.HUGGINGFACE_API_KEY || '',
    endpoint: process.env.HUGGINGFACE_ENDPOINT || 'https://api-inference.huggingface.co',
    models: {
      llm: process.env.LLM_MODEL || 'meta-llama/Llama-3.1-70b',
      embedding: process.env.EMBEDDING_MODEL || 'BAAI/bge-m3',
      summarization: process.env.SUMMARIZATION_MODEL || 'facebook/bart-large-cnn',
      ner: process.env.NER_MODEL || 'dslim/bert-base-NER',
      tableQA: process.env.TABLE_QA_MODEL || 'google/tapas-base',
      imageClassification: process.env.IMAGE_CLASSIFICATION_MODEL || 'google/vit-base-patch16-224',
    },
  },

  database: {
    agentdb: {
      path: process.env.AGENTDB_PATH || './data/agentdb',
    },
    postgres: {
      url: process.env.POSTGRES_URL || 'postgresql://postgres:password@localhost:5432/synapseflow',
    },
    redis: {
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    },
    neo4j: {
      uri: process.env.NEO4J_URI || 'bolt://localhost:7687',
      username: process.env.NEO4J_USERNAME || 'neo4j',
      password: process.env.NEO4J_PASSWORD || 'password',
    },
  },

  mcp: {
    serverPort: parseInt(process.env.MCP_SERVER_PORT || '3001', 10),
    sseEnabled: process.env.MCP_SSE_ENABLED === 'true',
    stdioEnabled: process.env.MCP_STDIO_ENABLED === 'true',
  },

  compute: {
    gpuEnabled: process.env.GPU_ENABLED === 'true',
    parallelism: parseInt(process.env.COMPUTE_PARALLELISM || '16', 10),
  },

  auth: {
    jwtSecret: process.env.JWT_SECRET || 'change-me-in-production',
    oauthClientId: process.env.OAUTH_CLIENT_ID || '',
    oauthClientSecret: process.env.OAUTH_CLIENT_SECRET || '',
  },
};
