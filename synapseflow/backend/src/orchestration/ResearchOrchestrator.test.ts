import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ResearchOrchestrator, ResearchQuery, ResearchResult } from './ResearchOrchestrator.js';

// Mock all external dependencies
vi.mock('claude-flow');
vi.mock('agentic-flow');
vi.mock('agentdb');
vi.mock('ruv-swarm');
vi.mock('strange-loops');
vi.mock('sublinear-toolkit');
vi.mock('@huggingface/inference');
vi.mock('../utils/logger.js');
vi.mock('../config/index.js', () => ({
  config: {
    huggingface: { apiKey: 'test-key' },
    database: { agentdb: { path: './test-db' } },
    compute: { gpuEnabled: false },
  },
}));

describe('ResearchOrchestrator', () => {
  let orchestrator: ResearchOrchestrator;

  beforeEach(() => {
    orchestrator = new ResearchOrchestrator();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('initialization', () => {
    it('should create a new instance', () => {
      expect(orchestrator).toBeInstanceOf(ResearchOrchestrator);
      expect(orchestrator.claudeFlow).toBeNull();
      expect(orchestrator.agenticFlow).toBeNull();
      expect(orchestrator.agentDB).toBeNull();
    });

    it('should initialize all components successfully', async () => {
      // Mock the initialize methods
      const mockClaudeFlow = {
        initialize: vi.fn().mockResolvedValue(undefined),
        orchestrate: vi.fn(),
        shutdown: vi.fn(),
      };
      const mockAgentDB = {
        initialize: vi.fn().mockResolvedValue(undefined),
        insert: vi.fn(),
        search: vi.fn(),
        close: vi.fn(),
        reflexion: {
          record: vi.fn(),
        },
      };
      const mockAgenticFlow = {
        initialize: vi.fn().mockResolvedValue(undefined),
        execute: vi.fn(),
        shutdown: vi.fn(),
      };
      const mockRuvSwarm = {
        initialize: vi.fn().mockResolvedValue(undefined),
        batch: vi.fn(),
        shutdown: vi.fn(),
      };
      const mockStrangeLoops = {
        initialize: vi.fn().mockResolvedValue(undefined),
        analyze: vi.fn(),
        shutdown: vi.fn(),
      };
      const mockSublinearToolkit = {
        initialize: vi.fn().mockResolvedValue(undefined),
        buildGraph: vi.fn(),
        shutdown: vi.fn(),
      };

      // Replace constructors with mocks
      const { ClaudeFlow } = await import('claude-flow');
      const { AgentDB } = await import('agentdb');
      const { AgenticFlow } = await import('agentic-flow');
      const { RuvSwarm } = await import('ruv-swarm');
      const { StrangeLoops } = await import('strange-loops');
      const { SublinearToolkit } = await import('sublinear-toolkit');

      vi.mocked(ClaudeFlow).mockImplementation(() => mockClaudeFlow as any);
      vi.mocked(AgentDB).mockImplementation(() => mockAgentDB as any);
      vi.mocked(AgenticFlow).mockImplementation(() => mockAgenticFlow as any);
      vi.mocked(RuvSwarm).mockImplementation(() => mockRuvSwarm as any);
      vi.mocked(StrangeLoops).mockImplementation(() => mockStrangeLoops as any);
      vi.mocked(SublinearToolkit).mockImplementation(() => mockSublinearToolkit as any);

      await orchestrator.initialize();

      expect(orchestrator.claudeFlow).toBeTruthy();
      expect(orchestrator.agentDB).toBeTruthy();
      expect(orchestrator.agenticFlow).toBeTruthy();
      expect(mockClaudeFlow.initialize).toHaveBeenCalled();
      expect(mockAgentDB.initialize).toHaveBeenCalled();
      expect(mockAgenticFlow.initialize).toHaveBeenCalled();
    });

    it('should handle initialization errors', async () => {
      const { ClaudeFlow } = await import('claude-flow');
      vi.mocked(ClaudeFlow).mockImplementation(() => {
        throw new Error('Initialization failed');
      });

      await expect(orchestrator.initialize()).rejects.toThrow('Initialization failed');
    });
  });

  describe('research', () => {
    beforeEach(async () => {
      // Setup mocks for research
      const mockClaudeFlow = {
        initialize: vi.fn(),
        orchestrate: vi.fn().mockResolvedValue({ workflowId: 'test-123' }),
        shutdown: vi.fn(),
      };
      const mockAgentDB = {
        initialize: vi.fn(),
        insert: vi.fn().mockResolvedValue(undefined),
        search: vi.fn(),
        close: vi.fn(),
        reflexion: {
          record: vi.fn().mockResolvedValue(undefined),
        },
      };
      const mockAgenticFlow = {
        initialize: vi.fn(),
        execute: vi.fn().mockResolvedValue({
          papers: [
            { id: '1', title: 'Test Paper 1', authors: ['Author 1'], year: 2024 },
            { id: '2', title: 'Test Paper 2', authors: ['Author 2'], year: 2023 },
          ],
          insights: [{ domain: 'AI', connection: 'test' }],
        }),
        shutdown: vi.fn(),
      };
      const mockRuvSwarm = {
        initialize: vi.fn(),
        batch: vi.fn().mockResolvedValue([
          { id: '1', title: 'Test Paper 1', embedding: [0.1, 0.2], summary: 'Summary 1' },
          { id: '2', title: 'Test Paper 2', embedding: [0.3, 0.4], summary: 'Summary 2' },
        ]),
        shutdown: vi.fn(),
      };
      const mockStrangeLoops = {
        initialize: vi.fn(),
        analyze: vi.fn().mockResolvedValue({
          trends: [{ year: 2024, count: 10 }],
        }),
        shutdown: vi.fn(),
      };
      const mockSublinearToolkit = {
        initialize: vi.fn(),
        buildGraph: vi.fn().mockResolvedValue({
          nodes: ['1', '2'],
          edges: [{ from: '1', to: '2' }],
        }),
        shutdown: vi.fn(),
      };
      const mockHfInference = {
        textGeneration: vi.fn().mockResolvedValue({
          generated_text: 'Hypothesis 1\nHypothesis 2\nHypothesis 3',
        }),
      };

      const { ClaudeFlow } = await import('claude-flow');
      const { AgentDB } = await import('agentdb');
      const { AgenticFlow } = await import('agentic-flow');
      const { RuvSwarm } = await import('ruv-swarm');
      const { StrangeLoops } = await import('strange-loops');
      const { SublinearToolkit } = await import('sublinear-toolkit');
      const { HfInference } = await import('@huggingface/inference');

      vi.mocked(ClaudeFlow).mockImplementation(() => mockClaudeFlow as any);
      vi.mocked(AgentDB).mockImplementation(() => mockAgentDB as any);
      vi.mocked(AgenticFlow).mockImplementation(() => mockAgenticFlow as any);
      vi.mocked(RuvSwarm).mockImplementation(() => mockRuvSwarm as any);
      vi.mocked(StrangeLoops).mockImplementation(() => mockStrangeLoops as any);
      vi.mocked(SublinearToolkit).mockImplementation(() => mockSublinearToolkit as any);
      vi.mocked(HfInference).mockImplementation(() => mockHfInference as any);

      await orchestrator.initialize();
    });

    it('should execute a basic research query', async () => {
      const query: ResearchQuery = {
        query: 'transformer models in NLP',
        domains: ['AI', 'NLP'],
        limit: 10,
      };

      const result = await orchestrator.research(query);

      expect(result).toBeDefined();
      expect(result.papers).toBeInstanceOf(Array);
      expect(result.papers.length).toBeGreaterThan(0);
      expect(result.totalResults).toBeGreaterThan(0);
      expect(result.latency).toMatch(/\d+ms/);
      expect(result.agentsUsed).toContain('PaperScraperAgent');
    });

    it('should include cross-domain insights when enabled', async () => {
      const query: ResearchQuery = {
        query: 'AI applications',
        crossDomain: true,
        limit: 5,
      };

      const result = await orchestrator.research(query);

      expect(result.crossDomainInsights).toBeDefined();
      expect(result.hypotheses).toBeDefined();
      expect(result.agentsUsed).toContain('HypothesisGeneratorAgent');
    });

    it('should skip cross-domain analysis when disabled', async () => {
      const query: ResearchQuery = {
        query: 'machine learning',
        crossDomain: false,
        limit: 5,
      };

      const result = await orchestrator.research(query);

      expect(result.hypotheses).toBeUndefined();
    });

    it('should respect result limit', async () => {
      const query: ResearchQuery = {
        query: 'deep learning',
        limit: 1,
      };

      const result = await orchestrator.research(query);

      expect(result.papers.length).toBeLessThanOrEqual(1);
    });

    it('should handle errors gracefully', async () => {
      // Make claudeFlow.orchestrate throw an error
      orchestrator.claudeFlow!.orchestrate = vi.fn().mockRejectedValue(new Error('Orchestration failed'));

      const query: ResearchQuery = { query: 'test' };

      await expect(orchestrator.research(query)).rejects.toThrow('Orchestration failed');
    });
  });

  describe('searchPapers', () => {
    beforeEach(async () => {
      const mockAgentDB = {
        initialize: vi.fn(),
        search: vi.fn().mockResolvedValue([
          { id: '1', title: 'Result 1', score: 0.95 },
          { id: '2', title: 'Result 2', score: 0.88 },
        ]),
        close: vi.fn(),
      };

      const { AgentDB } = await import('agentdb');
      vi.mocked(AgentDB).mockImplementation(() => mockAgentDB as any);

      const mockClaudeFlow = { initialize: vi.fn(), shutdown: vi.fn() };
      const { ClaudeFlow } = await import('claude-flow');
      vi.mocked(ClaudeFlow).mockImplementation(() => mockClaudeFlow as any);

      await orchestrator.initialize();
    });

    it('should search papers by vector', async () => {
      const queryVector = [0.1, 0.2, 0.3];
      const results = await orchestrator.searchPapers(queryVector, 10);

      expect(results).toBeInstanceOf(Array);
      expect(results.length).toBe(2);
      expect(orchestrator.agentDB!.search).toHaveBeenCalledWith(queryVector, { k: 10 });
    });

    it('should use default limit if not provided', async () => {
      const queryVector = [0.1, 0.2, 0.3];
      await orchestrator.searchPapers(queryVector);

      expect(orchestrator.agentDB!.search).toHaveBeenCalledWith(queryVector, { k: 10 });
    });
  });

  describe('shutdown', () => {
    it('should shutdown all components gracefully', async () => {
      const mockClaudeFlow = {
        initialize: vi.fn(),
        shutdown: vi.fn().mockResolvedValue(undefined),
      };
      const mockAgentDB = {
        initialize: vi.fn(),
        close: vi.fn().mockResolvedValue(undefined),
      };
      const mockAgenticFlow = {
        initialize: vi.fn(),
        shutdown: vi.fn().mockResolvedValue(undefined),
      };
      const mockRuvSwarm = {
        initialize: vi.fn(),
        shutdown: vi.fn().mockResolvedValue(undefined),
      };
      const mockStrangeLoops = {
        initialize: vi.fn(),
        shutdown: vi.fn().mockResolvedValue(undefined),
      };
      const mockSublinearToolkit = {
        initialize: vi.fn(),
        shutdown: vi.fn().mockResolvedValue(undefined),
      };

      const { ClaudeFlow } = await import('claude-flow');
      const { AgentDB } = await import('agentdb');
      const { AgenticFlow } = await import('agentic-flow');
      const { RuvSwarm } = await import('ruv-swarm');
      const { StrangeLoops } = await import('strange-loops');
      const { SublinearToolkit } = await import('sublinear-toolkit');

      vi.mocked(ClaudeFlow).mockImplementation(() => mockClaudeFlow as any);
      vi.mocked(AgentDB).mockImplementation(() => mockAgentDB as any);
      vi.mocked(AgenticFlow).mockImplementation(() => mockAgenticFlow as any);
      vi.mocked(RuvSwarm).mockImplementation(() => mockRuvSwarm as any);
      vi.mocked(StrangeLoops).mockImplementation(() => mockStrangeLoops as any);
      vi.mocked(SublinearToolkit).mockImplementation(() => mockSublinearToolkit as any);

      await orchestrator.initialize();
      await orchestrator.shutdown();

      expect(mockClaudeFlow.shutdown).toHaveBeenCalled();
      expect(mockAgentDB.close).toHaveBeenCalled();
      expect(mockAgenticFlow.shutdown).toHaveBeenCalled();
      expect(mockRuvSwarm.shutdown).toHaveBeenCalled();
      expect(mockStrangeLoops.shutdown).toHaveBeenCalled();
      expect(mockSublinearToolkit.shutdown).toHaveBeenCalled();
    });
  });
});
