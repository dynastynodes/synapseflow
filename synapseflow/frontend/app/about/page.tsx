import { Github, Twitter, Mail } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About SynapseFlow</h1>
          <p className="text-xl text-muted-foreground">
            Self-Learning AI Research Assistant for Cross-Domain Knowledge Discovery
          </p>
        </div>

        {/* Mission */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              SynapseFlow was created to solve a critical problem in research: the overwhelming
              amount of information and the difficulty of discovering cross-domain insights.
            </p>
            <p>
              With 2.5 million research papers published annually, researchers spend 60% of their
              time searching for relevant information. Manual literature reviews take 3-6 months,
              and researchers miss 80% of relevant papers outside their primary field.
            </p>
            <p>
              We built SynapseFlow to accelerate research discovery from months to hours while
              uncovering cross-domain connections that would be impossible to find manually.
            </p>
          </div>
        </section>

        {/* Technology */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Technology</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-6 rounded-lg bg-card border">
              <h3 className="font-semibold mb-2">66 AI Agents</h3>
              <p className="text-sm text-muted-foreground">
                Specialized agents work in parallel using claude-flow and agentic-flow to process
                1,000 papers per minute.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card border">
              <h3 className="font-semibold mb-2">150x Faster Search</h3>
              <p className="text-sm text-muted-foreground">
                Vector-based semantic search using agentdb with HNSW indexing achieves sub-500ms
                latency.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card border">
              <h3 className="font-semibold mb-2">Self-Learning</h3>
              <p className="text-sm text-muted-foreground">
                Reinforcement learning adapts to your preferences, improving recommendations by 20%
                monthly.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card border">
              <h3 className="font-semibold mb-2">213 MCP Tools</h3>
              <p className="text-sm text-muted-foreground">
                Model Context Protocol integration enables seamless CLI and IDE workflows.
              </p>
            </div>
          </div>
        </section>

        {/* Stack */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Orchestration</h3>
              <p className="text-sm text-muted-foreground">
                claude-flow (101 MCP tools), agentic-flow (66 agents)
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">AI & ML</h3>
              <p className="text-sm text-muted-foreground">
                HuggingFace (11 AI tasks), ruv-swarm (10-15x faster compute), strange-loops
                (temporal reasoning)
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Data</h3>
              <p className="text-sm text-muted-foreground">
                agentdb (vector DB), PostgreSQL, Redis, Neo4j, sublinear-toolkit (O(log n)
                algorithms)
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Frontend</h3>
              <p className="text-sm text-muted-foreground">
                Next.js 15, React 19, TypeScript, Tailwind CSS, D3.js
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="text-center py-12 border-t">
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/synapseflow"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </a>

            <a
              href="https://twitter.com/synapseflow"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="h-5 w-5" />
              <span>Twitter</span>
            </a>

            <a
              href="mailto:contact@synapseflow.ai"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>Email</span>
            </a>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Built with ❤️ by Full-Stack AI Architects
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Powered by claude-flow • agentic-flow • agentdb • ruv-swarm • strange-loops •
            HuggingFace
          </p>
        </section>
      </div>
    </div>
  )
}
