export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Documentation</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Learn how to use SynapseFlow's powerful research capabilities.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <div className="prose dark:prose-invert">
              <p>
                SynapseFlow is a self-learning AI research assistant that accelerates research
                discovery from months to hours using 66 specialized AI agents.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">API Reference</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-card border">
                <h3 className="font-semibold mb-2">POST /api/research</h3>
                <p className="text-sm text-muted-foreground">
                  Main research endpoint that orchestrates 66 agents to perform comprehensive
                  literature review.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-card border">
                <h3 className="font-semibold mb-2">POST /api/search</h3>
                <p className="text-sm text-muted-foreground">
                  Vector similarity search across 100M+ papers using agentdb.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-card border">
                <h3 className="font-semibold mb-2">POST /api/embeddings</h3>
                <p className="text-sm text-muted-foreground">
                  Generate embeddings for text using HuggingFace models.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Architecture</h2>
            <div className="prose dark:prose-invert">
              <p>
                SynapseFlow is built with cutting-edge technology including claude-flow,
                agentic-flow, agentdb, ruv-swarm, strange-loops, and HuggingFace AI models.
              </p>
              <p>
                For detailed architecture documentation, see the{' '}
                <a href="/PROJECT_STATUS.md" className="text-primary hover:underline">
                  project status
                </a>{' '}
                and{' '}
                <a href="/PRD_SYNAPSEFLOW.md" className="text-primary hover:underline">
                  PRD document
                </a>
                .
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
