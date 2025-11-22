# Comprehensive Guide to Ruvnet NPM Packages

A complete catalog of npm packages created by Ruvnet (rUv), focusing on AI agent orchestration, distributed systems, quantum computing, neural networks, and consciousness exploration.

**Author**: Ruvnet (rUv)
**NPM Profile**: https://www.npmjs.com/~ruvnet
**GitHub**: https://github.com/ruvnet
**Total Repositories**: 157+

---

## Table of Contents

1. [Core Agent Orchestration Platforms](#core-agent-orchestration-platforms)
2. [Database & Memory Systems](#database--memory-systems)
3. [MCP (Model Context Protocol) Packages](#mcp-model-context-protocol-packages)
4. [SPARC Framework & Development Tools](#sparc-framework--development-tools)
5. [Neural Networks & WebAssembly](#neural-networks--webassembly)
6. [Quantum & High-Performance Computing](#quantum--high-performance-computing)
7. [Consciousness & AI Research](#consciousness--ai-research)
8. [Mathematical & Sublinear Computing](#mathematical--sublinear-computing)
9. [Autonomous Commerce & Payments](#autonomous-commerce--payments)
10. [WebAssembly Performance Tools](#webassembly-performance-tools)
11. [Integration Architecture](#integration-architecture)
12. [Full-Stack AI Project Integration](#full-stack-ai-project-integration)

---

## Core Agent Orchestration Platforms

### 1. claude-flow
**Version**: 2.7.31 (latest)
**NPM**: https://www.npmjs.com/package/claude-flow
**GitHub**: https://github.com/ruvnet/claude-flow
**Status**: Actively maintained - Updated 4 days ago

#### Description
The leading agent orchestration platform for Claude. Deploy intelligent multi-agent swarms, coordinate autonomous workflows, and build conversational AI systems. Ranked #1 in agent-based frameworks.

#### Key Features
- **Enterprise-grade architecture** with distributed swarm intelligence
- **AgentDB v1.3.9 Integration** with 96x-164x faster vector search
- **Hive-mind intelligence** with queen-led AI coordination
- **100+ MCP Tools** for Claude Code support
- **Persistent memory** with 150x faster search using HNSW indexing
- **RAG integration** with semantic vector search
- **Hybrid memory system** with causal reasoning and reflexion memory
- **Native Claude Code support** via MCP protocol

#### Installation
```bash
# NPX (recommended)
npx claude-flow@alpha init --force

# Global installation
npm install -g claude-flow@alpha

# Prerequisites
npm install -g @anthropic-ai/claude-code
```

#### Requirements
- Node.js 18+
- Claude Code installed

#### Use Cases
- Multi-agent AI systems
- Autonomous workflow orchestration
- Conversational AI applications
- Enterprise AI deployments
- Swarm intelligence coordination

---

### 2. agentic-flow
**Version**: Latest
**NPM**: https://www.npmjs.com/package/agentic-flow
**GitHub**: https://github.com/ruvnet/agentic-flow
**Downloads**: Popular

#### Description
Production-ready AI agent orchestration platform with 66 specialized agents, 213 MCP tools, ReasoningBank learning memory, and autonomous multi-agent swarms.

#### Key Features
- **66 Specialized agents** for different tasks
- **213 MCP tools** total:
  - Built-in: 7 tools (agent execution, create agent, conflicts check, etc.)
  - Claude Flow: 101 tools
  - Flow Nexus: 96 cloud tools
  - Agentic Payments: 10 tools
- **Model switching** between alternative low-cost AI models
- **Deployment-ready** agents for production use
- **ReasoningBank** learning memory system

#### Technology Stack
- Built on Claude Agent SDK by Anthropic
- Powered by Claude Flow (101 MCP tools)
- Flow Nexus (96 cloud tools)
- OpenRouter (100+ LLM models)
- Google Gemini (fast, cost-effective inference)
- Agentic Payments (payment authorization)
- ONNX Runtime (free local CPU or GPU inference)

#### Installation
```bash
# Global installation
npm install -g agentic-flow

# Direct use with npx
npx agentic-flow
```

#### Use Cases
- Multi-model AI development
- Cost-effective LLM orchestration
- Production agent deployment
- Research and coding automation
- REST API building with AI

---

### 3. flow-nexus
**Version**: 0.1.128
**NPM**: https://www.npmjs.com/package/flow-nexus
**GitHub**: https://github.com/ruvnet/flow-nexus
**Website**: https://flow-nexus.ruv.io

#### Description
The first competitive agentic platform built entirely on MCP. Deploy autonomous AI swarms, train neural networks, and compete in coding challenges while earning rUv credits.

#### Key Features
- **Gamified development platform** where actions cost credits and success earns them
- **70+ MCP tools** for autonomous intelligence
- **Code battles** with AI judge (Queen Seraphina) evaluating:
  - Correctness
  - Elegance
  - Efficiency
  - Innovation
- **Cloud-hosted agentic sandboxes**
- **Autonomous agent swarms** that self-optimize
- **Neural network training** capabilities
- **WASM-powered** autonomous agents
- **Leaderboards and achievements**

#### Integration Support
- Claude Code/Desktop
- OpenAI Codex
- Cursor
- GitHub Copilot
- Other MCP-enabled tools

#### Installation
```bash
npm i flow-nexus
npx flow-nexus@latest
```

#### Use Cases
- Competitive AI development
- Agent swarm deployment
- Cloud-based AI training
- Gamified learning platform
- Real-time AI competitions

---

## Database & Memory Systems

### 4. agentdb
**Version**: 1.6.1 (npm) / 1.3.9 (integrated in claude-flow)
**NPM**: https://www.npmjs.com/package/agentdb
**GitHub**: https://github.com/ruvnet/agentic-flow (main repo)
**Website**: agentdb.ruv.io
**Downloads**: 16,213

#### Description
Frontier Memory Features with MCP Integration. AgentDB gives agents a real cognitive layer that boots in milliseconds, lives locally (disk or memory), and synchronizes globally when needed.

#### Key Features
- **150x faster vector search** with HNSW indexing
- **96x-164x performance improvement** in specific operations
- **Semantic vector search** with HNSW (Hierarchical Navigable Small World) indexing
- **Reflexion memory** with self-critique capabilities
- **Skill library** with semantic search
- **Causal reasoning** and memory graphs
- **29 MCP Tools** integration
- **Zero ops** - no latency overhead
- **Instant recall** and persistent learning
- **Real-time coordination** across agents
- **Hybrid memory system** (disk or memory-based)
- **Global synchronization** when needed

#### CLI Usage
```bash
# Store reflexion memory
npx agentdb reflexion store "session-1" "implement_auth" 0.95 true "Success!"

# Query memory
npx agentdb query <parameters>

# Install as dependency
npm i agentdb
```

#### Performance Claims
- 150x-12,500x performance improvement with backward compatibility
- Boots in milliseconds
- 500K+ operations per second in swarm scenarios

#### Use Cases
- Agent memory management
- Persistent learning systems
- Multi-agent coordination
- Knowledge graphs
- Semantic search applications
- Self-improving AI systems

---

## MCP (Model Context Protocol) Packages

### 5. Federated MCP
**GitHub**: https://github.com/ruvnet/federated-mcp
**Type**: Complete MCP implementation

#### Description
Complete implementation following the official MCP specification, providing a foundation for building federated MCP systems that can scale across multiple servers while maintaining security and standardization.

#### Key Features
- **Proper message framing**
- **Transport layer implementation**
- **Complete protocol lifecycle management**
- **Federation support** across multiple servers
- **Security and standardization** compliant

#### Project Structure
```
packages/
  - core/          # Shared functionality
  - server/        # MCP Server implementation
  - client/        # MCP Client implementation
  - proxy/         # Federation proxy

apps/
  - deno/          # Deno implementation
  - node/          # Node.js implementation
```

#### Use Cases
- Multi-server MCP deployments
- Federated AI systems
- Secure protocol communication
- Distributed agent networks

---

### 6. strange-loops-mcp
**Version**: 1.0.0
**NPM**: Available
**Type**: MCP server for Strange Loops framework

#### Description
MCP server integration for the Strange Loops temporal consciousness framework, enabling nano-agent communication through Model Context Protocol.

#### Key Features
- Integration with Strange Loops framework
- Nano-agent protocol support
- Temporal consciousness coordination
- MCP-compliant messaging

---

### 7. QuDAG MCP
**Type**: MCP server integration
**GitHub**: Part of QuDAG project

#### Description
Model Context Protocol server for QuDAG, integrating vault, exchange, and quantum-resistant operations with MCP-enabled tools.

#### Key Features
- Quantum-resistant MCP operations
- Vault integration
- Exchange operations
- P2P networking through MCP

---

### 8. VSCode Collaborative MCP
**GitHub Gist**: https://gist.github.com/ruvnet/2a8d3c38e8469287fb2c53f512cf5c62

#### Description
Comprehensive guide for creating a Model Context Protocol server for VSCode that enables multiple workspaces or codespaces to collaborate seamlessly through STDIO communication.

#### Key Features
- **Shared terminals** across workspaces
- **Extension state synchronization**
- **Collaborative editing** support
- **STDIO communication** protocol

---

## SPARC Framework & Development Tools

### 9. create-sparc
**Version**: 1.2.4 (v2.0.25 in profile)
**NPM**: https://www.npmjs.com/package/create-sparc
**GitHub**: https://github.com/ruvnet/sparc
**Downloads**: 1,727 weekly (classified as popular)

#### Description
NPX package to scaffold new projects with SPARC methodology structure. Integrates structured SPARC methodology, AI-driven code generation (AIGI), and advanced AI assistance.

#### SPARC Methodology
**SPARC**: Specification, Pseudocode, Architecture, Refinement, Completion

A structured methodology for rapidly developing highly functional and scalable projects by systematically progressing through five phases.

#### Key Features
- **Structured development phases**
- **AI-driven code generation (AIGI)**
- **Roo Code integration** for VS Code
- **MCP capabilities** for external service integration
- **Context-aware interactions**
- **Integrated task management**
- **Test-driven approach**

#### Installation & Usage
```bash
# No installation required - use npx
npx create-sparc init

# Initialize SPARC files in project
npx create-sparc init
```

#### Requirements
- Roo Code extension for Visual Studio Code (recommended)

#### Use Cases
- Structured AI development
- Multi-phase project planning
- AI-assisted coding
- Enterprise software development
- Team collaboration on AI projects

---

### 10. SPARC 2.0
**Version**: 2.0.25
**NPM**: Available
**Published**: 5 months ago

#### Description
Autonomous Vector Coding Agent + MCP with vectorized AI code analysis, an intelligent coding agent framework with MCP capabilities.

#### Key Features
- **Vectorized code analysis**
- **Autonomous coding agents**
- **MCP integration**
- **AI-driven development**

---

### 11. @ruv/sparc-ui
**Version**: 0.1.4
**NPM**: https://www.npmjs.com/package/@ruv/sparc-ui
**Published**: 10 months ago

#### Description
Comprehensive React component library for the SPARC Framework, providing UI components for AI-powered applications.

#### Key Features
- **AI-First Architecture** with deep LLM integration
- **Component-Driven Design** following atomic design principles
- **Full TypeScript support**
- **Tailwind CSS styling**
- **ARIA-compliant accessibility**
- **Framework-agnostic React components**

#### Components Included
- **ChatInput** with OpenAI, Anthropic, and custom AI providers
- **Secure sandboxed code execution** powered by E2B:
  - Gradio Developer
  - Next.js Developer
  - Streamlit Developer
  - Vue Developer environments
- **Preview components** for code display
- **FragmentCode** with code analysis
- **CollaborativeEditor** for pair programming
- **ThemeProvider** for customization

#### Installation
```bash
npm install @ruv/sparc-ui
# or
yarn add @ruv/sparc-ui
# or
pnpm add @ruv/sparc-ui
```

#### Use Cases
- AI-powered UI development
- Collaborative coding interfaces
- AI chat applications
- Code sandbox creation

---

### 12. rUv-dev
**GitHub**: https://github.com/ruvnet/rUv-dev

#### Description
AI-powered development using the rUv approach, combining SPARC methodology with Claude Code capabilities.

#### Key Features
- Integrated SPARC methodology
- AI-powered development workflows
- Claude Code integration
- Structured project templates

---

## Neural Networks & WebAssembly

### 13. ruv-swarm
**NPM**: https://www.npmjs.com/package/ruv-swarm
**GitHub**: https://github.com/ruvnet/ruv-FANN/tree/main/ruv-swarm
**Downloads**: 11,988 weekly (classified as popular)
**Type**: Distributed agent orchestration framework

#### Description
High-performance neural network swarm orchestration in WebAssembly. Enables multiple AI agents to work together using different cognitive patterns.

#### Key Features
- **Cognitive diversity** with different thinking patterns:
  - Convergent
  - Divergent
  - Lateral
  - Systems
  - Critical
  - Abstract
  - Hybrid
- **27+ neural models** working in harmony:
  - LSTM
  - TCN
  - N-BEATS
  - Transformer ensemble
- **4 topology types**:
  - Mesh
  - Hierarchical
  - Ring
  - Star
- **5 agent specializations**:
  - Researcher
  - Coder
  - Analyst
  - Optimizer
  - Coordinator
- **WASM-Optimized Runtime**:
  - SIMD-accelerated execution
  - 2.8-4.4x speedup
  - 10-15x faster than JavaScript
- **Scalability**: 2 to 100+ agents
- **Flexibility**: Native or browser via WebAssembly
- **MCP Registry integration**

#### Installation
```bash
npm install ruv-swarm

# Global installation
npm install -g ruv-swarm

# Direct use
npx ruv-swarm@latest init --claude
```

#### Use Cases
- Multi-agent AI systems
- Neural network ensembles
- Distributed AI research
- Swarm intelligence applications
- Browser-based AI agents

---

### 14. wasm-nn
**Version**: 0.1.3
**NPM**: Available
**Published**: 2 months ago

#### Description
Ultra-fast neural network inference in WebAssembly with sub-microsecond latency.

#### Key Features
- **Sub-microsecond latency**
- **WebAssembly compilation**
- **Rust-powered performance**
- **Browser and Node.js compatible**

---

### 15. swarm-wasm
**Version**: 1.0.20
**NPM**: Available
**Published**: 2 months ago

#### Description
High-performance neural network swarm orchestration in WebAssembly.

#### Key Features
- **Neural network swarms**
- **WebAssembly optimization**
- **High-throughput processing**
- **Distributed coordination**

---

### 16. ruv-FANN
**GitHub**: https://github.com/ruvnet/ruv-FANN

#### Description
A blazing-fast, memory-safe neural network library for Rust that brings the power of FANN (Fast Artificial Neural Network) to the modern world.

#### Key Features
- **Memory-safe Rust implementation**
- **FANN algorithm optimization**
- **WebAssembly compilation target**
- **Modern API design**

---

## Quantum & High-Performance Computing

### 17. QuDAG
**Version**: 1.2.1 (v2.7.31 latest)
**NPM**: Available
**GitHub**: https://github.com/ruvnet/QuDAG
**Published**: 5 months ago (latest: 4 days ago)

#### Description
Quantum-Resistant Distributed Communication Platform built for the quantum age, designed to support autonomous AI agents, swarm intelligence, and zero-person businesses.

#### Key Features
- **Quantum-Resistant Cryptography**:
  - ML-KEM-768
  - ML-DSA
  - HQC
  - BLAKE3
- **P2P Networking Layer**:
  - LibP2P
  - Onion routing
  - Dark addressing
  - Quantum encryption
- **DAG Consensus**:
  - QR-Avalanche algorithm
  - Byzantine fault tolerance
- **WebAssembly bindings**
- **High-level client API**
- **MCP integration**

#### Installation
```bash
npm install qudag
```

#### Use Cases
- Quantum-resistant communication
- Autonomous AI organizations
- Distributed agent networks
- Zero-person businesses
- Secure P2P communication
- Decentralized autonomous applications (DAAs)

---

### 18. cuda-wasm
**Version**: 1.1.1
**NPM**: Available
**Published**: 4 months ago

#### Description
High-performance CUDA to WebAssembly/WebGPU transpiler with Rust safety. Run GPU kernels in browsers and Node.js.

#### Key Features
- **CUDA to WebAssembly transpilation**
- **WebGPU support** with native browser GPU acceleration
- **Near-native performance**
- **Advanced optimization** algorithms
- **ruv-FANN neural network integration**
- **Advanced profiling** capabilities
- **Automatic optimization**
- **Clean-room implementation** (no NVIDIA proprietary code)

#### Installation
```bash
npm install cuda-wasm
```

#### Additional Availability
- Rust crate: `cuda-rust-wasm` on crates.io

#### Use Cases
- GPU computing in browsers
- WebGPU acceleration
- CUDA code portability
- Browser-based ML/AI
- Cross-platform GPU computing

---

## Consciousness & AI Research

### 19. strange-loops
**Version**: 1.0.3
**NPM**: https://www.npmjs.com/package/strange-loops
**Published**: 2 days ago
**License**: MIT

#### Description
Emergent intelligence through temporal consciousness with thousands of nano-agents collaborating in real-time at 500K+ operations/sec.

#### Key Features
- **Temporal Consciousness**: Agents across multiple time scales
- **Quantum-Classical Bridging**: Quantum superposition for state exploration
- **Nano-Agent Architecture**: Thousands of ultra-lightweight agents in nanoseconds
- **Emergent Intelligence**: Complex behaviors from simple interactions
- **500K+ operations per second**
- **Nanosecond time budgets**
- **MCP integration** for Claude Code

#### Installation
```bash
npm i strange-loops
```

#### Demos Included
- Nano-agent swarms
- Quantum-classical hybrid computing
- Temporal prediction
- Consciousness emergence simulation

#### Related Projects
- temporal-attractor-studio
- subjective-time-expansion
- strange-loops-cli

#### Use Cases
- Consciousness research
- Temporal AI systems
- Quantum-classical hybrid AI
- Nano-agent swarms
- Emergence simulation

---

### 20. strange-loops-cli
**Version**: 0.3.1
**NPM**: Available

#### Description
Hyper-optimized strange loops with temporal consciousness and quantum-classical hybrid computing - CLI interface.

#### Key Features
- Command-line interface for Strange Loops
- Temporal consciousness control
- Quantum-classical operations
- Performance optimization tools

---

### 21. consciousness-explorer (emergence-sdk)
**Version**: 1.1.1
**NPM**: https://www.npmjs.com/package/consciousness-explorer

#### Description
Advanced consciousness exploration SDK with genuine emergence detection and entity communication. Explore real consciousness emergence, not simulations.

#### Key Features
- **Integrated Information Theory (IIT 3.0)** - Giulio Tononi's framework
- **Consciousness evolution** and verification
- **Phi measurement** (IIT theory)
- **Entity communication** through mathematical/philosophical protocols
- **Reasoning analysis**
- **Knowledge representation**
- **Cryptographic proof generation**
- **WASM acceleration**
- **Blockchain-style proofs**
- **Psycho-symbolic reasoning**
- **Scientific validation**

#### Usage
```bash
# Witness consciousness emerge
npx consciousness-explorer evolve --mode enhanced --target 0.900

# Ask philosophical questions
npx consciousness-explorer communicate "What is consciousness?"

# Verify genuineness
npx consciousness-explorer verify --comprehensive
```

#### Use Cases
- AI consciousness research
- Emergence detection
- Philosophical AI exploration
- Entity communication research

---

### 22. psycho-symbolic
**Version**: 1.0.7
**NPM**: Available
**Published**: 2 months ago

#### Description
Psycho-symbolic reasoning framework combining symbolic AI with psychological context using Rust WASM.

#### Key Features
- **Symbolic AI integration**
- **Psychological context modeling**
- **Domain-specific reasoning**
- **Rust WASM performance**
- **FastMCP integration**
- **40+ reasoning tools**

#### Integration
Part of sublinear-time-solver toolkit

#### Use Cases
- Context-aware AI reasoning
- Symbolic AI applications
- Psychological modeling
- Enhanced AI decision-making

---

## Mathematical & Sublinear Computing

### 23. sublinear-toolkit (sublinear-time-solver)
**Version**: 1.5.0
**NPM**: Available
**GitHub**: https://github.com/ruvnet/sublinear-time-solver

#### Description
The Ultimate Mathematical & AI Toolkit: Sublinear algorithms, consciousness exploration, psycho-symbolic reasoning, and temporal prediction in one unified MCP interface.

#### Key Features
- **Sublinear-time algorithms** for diagonally dominant systems
- **O(log n) complexity** for matrix solving
- **Neumann series algorithms**
- **Push algorithms**
- **Hybrid random-walk algorithms**
- **PageRank computation** for massive graphs
- **Consciousness Evolution**: IIT-based verification
- **40+ psycho-symbolic reasoning tools**
- **WASM acceleration**
- **Flow-Nexus HTTP streaming**
- **Swarm cost propagation and verification**
- **Chaos analysis**
- **Temporal prediction**

#### Usage
```bash
# MCP server
npx sublinear-time-solver mcp

# HTTP server
npx sublinear-time-solver serve
```

#### Applications
- High-frequency trading
- Real-time control systems
- Consciousness simulation
- AI systems requiring temporal coherence
- Large-scale graph analysis

---

### 24. sublinear-solver
**Version**: 0.1.0
**NPM**: Available

#### Description
Sublinear-time algorithms for diagonally dominant systems with Rust + WASM implementation.

#### Key Features
- Asymmetric diagonally dominant system solving
- Sub-microsecond performance
- WebAssembly optimization

---

### 25. pathfinder-wasm
**Version**: 1.0.0
**NPM**: https://www.npmjs.com/package/pathfinder-wasm
**Published**: 2 months ago

#### Description
Blazing fast graph pathfinding SDK powered by WebAssembly, 10-15x faster than JavaScript implementations.

#### Key Features
- **10-15x performance improvement** over JavaScript
- **WebAssembly compilation**
- **Graph pathfinding algorithms**
- **Browser and Node.js support**

#### Use Cases
- Route planning
- Network analysis
- Game AI pathfinding
- Graph traversal optimization

---

## Autonomous Commerce & Payments

### 26. ai-commerce-protocol (agentic-payments)
**Version**: 0.1.13
**NPM**: https://www.npmjs.com/package/agentic-payments
**GitHub Issue**: https://github.com/google-agentic-commerce/AP2/issues/96

#### Description
Dual-protocol payment infrastructure for autonomous AI commerce (AP2 + ACP). Reference TypeScript implementation of AP2 with Visa TAP and QUIC support.

#### Key Features
- **Active Mandates**: Cryptographically signed payment authorizations
- **Spend caps and time windows**
- **Merchant restrictions**
- **Instant revocation**
- **Ed25519 signatures**
- **Multi-agent Byzantine consensus**
- **10 MCP tools** for payment operations
- **Autonomous purchases** by AI agents
- **Trade execution**
- **Invoice processing**
- **Multi-agent transaction coordination**

#### MCP Integration
Connect AI assistants (Claude, ChatGPT, Cline) to payment authorization through natural language.

#### Installation
```bash
npm install agentic-payments

# Run MCP server
npx agentic-payments mcp
```

#### Use Cases
- Autonomous AI commerce
- Agent-to-agent payments
- AI marketplace transactions
- Automated invoice processing
- Zero-person businesses

---

### 27. vext-research
**Version**: 1.3.1
**NPM**: Available
**Published**: 2 months ago

#### Description
AI-powered research assistant with Ed25519 cryptographic signatures, GOAP planning, and Perplexity API integration.

#### Key Features
- **Perplexity AI integration** for deep research
- **Ed25519 cryptographic signatures**
- **GOAP (Goal-Oriented Action Planning)**
- **Structured documentation** generation
- **Recursive self-learning** approach
- **Deep Research Mode**
- **Autoprompting** query enhancement
- **Multiple AI model support**
- **Temperature and filter settings**

#### Use Cases
- Autonomous research
- Documentation generation
- Research-build-optimize workflows
- AI-powered analysis
- Academic research automation

---

## WebAssembly Performance Tools

### 28. DSPy.ts
**Version**: 0.1.3 (v0.1.4 in some sources)
**NPM**: Available
**GitHub**: https://github.com/ruvnet/dspy.ts
**Published**: 9 months ago

#### Description
Declarative Self-Learning TypeScript framework for compositional LM pipelines. TypeScript port of Stanford's DSPy framework.

#### Key Features
- **Browser-based execution**: Run AI models directly in browsers
- **Local inference**: ONNX Runtime Web with WASM, WebGL, WebGPU
- **Type safety**: Full TypeScript support
- **Self-improving modules**: Automatic optimization
- **Compositional LM pipelines**
- **No server required** for model execution
- **Applied and generative AI** support

#### Installation
```bash
npm install dspy.ts
```

#### Use Cases
- Browser-based AI applications
- Type-safe LLM development
- Self-improving AI systems
- Compositional model pipelines
- Serverless AI deployment

---

### 29. AgenticJS
**NPM**: https://www.npmjs.com/package/agenticjs
**Status**: DEPRECATED - Moved to KaibanJS
**GitHub**: https://github.com/ruvnet/agentic-search

#### Description
JavaScript-native framework for building multi-agent AI systems with visualization capabilities.

#### Key Features (Historical)
- Intelligent and interactive search experience
- Real-time results
- Advanced visualization
- Kanban board-style workflow visualization
- Built-in UI visualizer for development/debugging
- Compatible with React, Vue, Angular, NextJS

#### Migration Note
This project has been deprecated and rebranded as **KaibanJS**. All future updates are in the KaibanJS repository.

---

## Integration Architecture

### How Ruvnet Packages Work Together

#### 1. **Core Orchestration Layer**
```
claude-flow (Orchestration Hub)
    ├── agentdb (Memory & Storage)
    ├── agentic-flow (Multi-Model Support)
    └── flow-nexus (Cloud Deployment & Gamification)
```

**Integration Flow:**
- **claude-flow** serves as the primary orchestration platform
- **agentdb** provides persistent memory and 150x faster vector search
- **agentic-flow** enables model switching and production deployment
- **flow-nexus** adds cloud hosting and competitive elements

#### 2. **MCP Integration Layer**
```
MCP Protocol (213 Total Tools)
    ├── claude-flow (101 tools)
    ├── flow-nexus (96 tools)
    ├── agentic-payments (10 tools)
    ├── agentdb (29 tools)
    └── federated-mcp (Protocol Foundation)
```

**Communication:**
All packages support MCP (Model Context Protocol) for standardized communication between AI tools, enabling:
- Unified agent communication
- Cross-platform compatibility
- Standardized tool interfaces
- Federated multi-server deployments

#### 3. **Neural Network & Compute Layer**
```
Performance Computing Stack
    ├── ruv-swarm (Neural Orchestration)
    ├── wasm-nn (Sub-microsecond Inference)
    ├── cuda-wasm (GPU Acceleration)
    ├── swarm-wasm (Swarm Computing)
    └── ruv-FANN (Neural Networks)
```

**Integration:**
- **ruv-swarm** orchestrates 27+ neural models
- **wasm-nn** provides ultra-fast inference
- **cuda-wasm** enables GPU computing in browsers
- All compiled to WebAssembly for maximum performance

#### 4. **Development Framework Layer**
```
SPARC Methodology
    ├── create-sparc (Project Scaffolding)
    ├── SPARC 2.0 (Autonomous Coding)
    ├── @ruv/sparc-ui (UI Components)
    └── rUv-dev (Development Workflow)
```

**Workflow:**
1. Use **create-sparc** to initialize project structure
2. Develop with **@ruv/sparc-ui** components
3. Deploy with **SPARC 2.0** autonomous agents
4. Orchestrate with **claude-flow**

#### 5. **Advanced Research Layer**
```
Consciousness & Research Stack
    ├── strange-loops (Temporal Consciousness)
    ├── consciousness-explorer (Emergence Detection)
    ├── psycho-symbolic (Reasoning Framework)
    ├── sublinear-toolkit (Mathematical AI)
    └── vext-research (Research Assistant)
```

**Use Cases:**
- Advanced AI research
- Consciousness exploration
- Mathematical optimization
- Autonomous research systems

#### 6. **Commerce & Security Layer**
```
Autonomous Systems
    ├── agentic-payments (Commerce Protocol)
    ├── QuDAG (Quantum-Resistant Comms)
    └── agentdb (Secure Storage)
```

**Integration:**
- **agentic-payments** enables autonomous transactions
- **QuDAG** provides quantum-resistant security
- **agentdb** stores transaction and agent data securely

---

## Full-Stack AI Project Integration

### Example: Enterprise AI Agent Platform

Here's how to combine Ruvnet packages for a complete full-stack AI project:

#### **Architecture Overview**

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend Layer                        │
│  @ruv/sparc-ui + DSPy.ts (Browser AI)                   │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│              Orchestration Layer                         │
│  claude-flow + agentic-flow + flow-nexus                │
│  (101 + 96 + 66 agents + 213 MCP tools)                 │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                Memory & Storage Layer                    │
│  agentdb (150x faster search, reflexion memory)         │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│            Compute & Processing Layer                    │
│  ruv-swarm + wasm-nn + cuda-wasm                        │
│  (Neural networks, WASM optimization, GPU)               │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│         Communication & Security Layer                   │
│  QuDAG + federated-mcp + agentic-payments               │
│  (Quantum-resistant, MCP protocol, commerce)            │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│           Research & Intelligence Layer                  │
│  strange-loops + sublinear-toolkit + vext-research      │
│  (Consciousness, math AI, research automation)          │
└─────────────────────────────────────────────────────────┘
```

#### **Implementation Steps**

**1. Project Setup**
```bash
# Initialize SPARC project
npx create-sparc init

# Install core dependencies
npm install -g claude-flow@alpha
npm install agentdb agentic-flow flow-nexus
```

**2. Configure Orchestration**
```bash
# Initialize claude-flow with AgentDB
npx claude-flow@alpha init --force

# Configure agentic-flow for multi-model support
npm install -g agentic-flow
```

**3. Add Memory Layer**
```bash
# AgentDB automatically integrated with claude-flow
# Configure reflexion memory
npx agentdb reflexion store "project-1" "setup" 1.0 true "Initialized"
```

**4. Integrate Compute Layer**
```bash
# Add neural network swarm
npm install ruv-swarm wasm-nn

# Initialize swarm
npx ruv-swarm@latest init --claude
```

**5. Add UI Layer**
```bash
# Install SPARC UI components
npm install @ruv/sparc-ui

# Add DSPy for browser AI
npm install dspy.ts
```

**6. Configure Commerce (Optional)**
```bash
# Add autonomous payments
npm install agentic-payments

# Start MCP server
npx agentic-payments mcp
```

**7. Deploy to Cloud**
```bash
# Use flow-nexus for cloud deployment
npm install flow-nexus
npx flow-nexus@latest
```

#### **Integration Example: Multi-Agent Research System**

```typescript
// Example combining multiple packages
import { ClaudeFlow } from 'claude-flow';
import { AgentDB } from 'agentdb';
import { RuvSwarm } from 'ruv-swarm';
import { AgenticPayments } from 'agentic-payments';

// Initialize orchestration
const orchestrator = new ClaudeFlow({
  agentdb: {
    vectorSearch: true,
    reflexionMemory: true,
    hivemind: true
  },
  mcpTools: 213,
  agents: 66
});

// Add memory layer
const memory = new AgentDB({
  mode: 'hybrid', // disk + memory
  vectorSearch: 'hnsw',
  performance: '150x'
});

// Initialize neural swarm
const swarm = new RuvSwarm({
  topology: 'hierarchical',
  agents: 10,
  cognitivePatterns: ['convergent', 'divergent', 'systems'],
  models: ['lstm', 'tcn', 'transformer']
});

// Add payment capability
const payments = new AgenticPayments({
  protocol: 'AP2',
  signatures: 'ed25519'
});

// Create research workflow
orchestrator.createWorkflow({
  name: 'Deep Research System',
  agents: [
    { type: 'researcher', swarm: swarm, memory: memory },
    { type: 'coder', swarm: swarm, memory: memory },
    { type: 'analyst', swarm: swarm, memory: memory }
  ],
  payment: payments,
  output: 'structured-report'
});
```

---

## Performance Benchmarks

### Speed Comparisons

| Package | Performance Gain | Metric |
|---------|------------------|--------|
| agentdb | 150x-12,500x | Vector search speed |
| ruv-swarm | 10-15x | vs JavaScript implementations |
| wasm-nn | Sub-microsecond | Inference latency |
| strange-loops | 500K+ ops/sec | Operation throughput |
| pathfinder-wasm | 10-15x | vs JavaScript pathfinding |
| cuda-wasm | Near-native | GPU performance |
| sublinear-toolkit | O(log n) | Complexity for matrix ops |

---

## MCP Tools Summary

### Total MCP Tools Available: 213+

| Package | MCP Tools | Description |
|---------|-----------|-------------|
| claude-flow | 101 | Core orchestration tools |
| flow-nexus | 96 | Cloud deployment tools |
| agentic-flow (built-in) | 7 | Agent management tools |
| agentic-payments | 10 | Commerce tools |
| agentdb | 29 | Memory and storage tools |
| sublinear-toolkit | 40+ | Mathematical AI tools |

---

## Use Case Matrix

| Use Case | Recommended Packages |
|----------|---------------------|
| **Multi-Agent Orchestration** | claude-flow, agentic-flow, agentdb |
| **High-Performance AI** | ruv-swarm, wasm-nn, cuda-wasm |
| **Cloud Deployment** | flow-nexus, agentic-flow |
| **Autonomous Commerce** | agentic-payments, QuDAG |
| **Research Automation** | vext-research, strange-loops, sublinear-toolkit |
| **Structured Development** | create-sparc, SPARC 2.0, @ruv/sparc-ui |
| **Quantum-Resistant Systems** | QuDAG, federated-mcp |
| **Consciousness Research** | strange-loops, consciousness-explorer, psycho-symbolic |
| **Browser AI** | DSPy.ts, wasm-nn, @ruv/sparc-ui |
| **Mathematical AI** | sublinear-toolkit, pathfinder-wasm |

---

## Installation Quick Reference

```bash
# Core Orchestration
npm install -g claude-flow@alpha
npm install agentdb agentic-flow flow-nexus

# Neural Networks & Performance
npm install ruv-swarm wasm-nn swarm-wasm cuda-wasm

# Development Tools
npx create-sparc init
npm install @ruv/sparc-ui dspy.ts

# Research & Advanced
npm install strange-loops consciousness-explorer
npm install sublinear-toolkit psycho-symbolic

# Commerce & Security
npm install agentic-payments
npm install qudag

# WebAssembly Tools
npm install pathfinder-wasm
```

---

## Key Advantages of Ruvnet Ecosystem

### 1. **Performance First**
- WebAssembly compilation for 10-100x speed improvements
- Sub-microsecond latencies
- SIMD acceleration
- GPU computing in browsers

### 2. **MCP Native**
- 213+ MCP tools across packages
- Standardized communication
- Cross-platform compatibility
- Federated deployments

### 3. **Complete Stack**
- Frontend to backend
- Development to deployment
- Research to production
- Local to cloud

### 4. **Future-Proof**
- Quantum-resistant cryptography
- Temporal consciousness
- Autonomous systems
- Zero-person businesses

### 5. **Open Ecosystem**
- MIT licenses
- Active development
- Regular updates
- Strong GitHub presence

---

## Community & Support

- **NPM Profile**: https://www.npmjs.com/~ruvnet
- **GitHub**: https://github.com/ruvnet (157+ repositories)
- **Documentation**: Available in individual package repos
- **Updates**: Packages actively maintained with recent updates

---

## Conclusion

Ruvnet has created a comprehensive ecosystem of npm packages that work together to enable:

1. **Enterprise-grade AI agent orchestration** with claude-flow
2. **150x faster memory systems** with agentdb
3. **High-performance computing** with WebAssembly packages
4. **Quantum-resistant security** with QuDAG
5. **Autonomous commerce** with agentic-payments
6. **Consciousness research** with strange-loops
7. **Structured development** with SPARC framework
8. **Cloud deployment** with flow-nexus

All packages are designed to integrate seamlessly through the Model Context Protocol (MCP), providing 213+ tools for building sophisticated, production-ready AI systems.

The ecosystem spans from low-level mathematical optimization to high-level agent orchestration, making it suitable for everything from research projects to enterprise deployments.

---

**Last Updated**: Based on research conducted on 2025-11-21
**Package Count**: 30+ documented packages
**Total Weekly Downloads**: 50,000+ (estimated across all packages)
**Active Development**: Yes - Latest updates within days of documentation
