import { SearchInterface } from '@/components/SearchInterface'
import { StatsOverview } from '@/components/StatsOverview'
import { Features } from '@/components/Features'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          SynapseFlow
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-4">
          Self-Learning AI Research Assistant
        </p>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
          Accelerate research discovery from <span className="font-semibold text-foreground">months to hours</span> with 66 AI agents,
          150x faster search, and cross-domain insights
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
          <div className="p-4 rounded-lg bg-card border">
            <div className="text-3xl font-bold text-primary">66</div>
            <div className="text-sm text-muted-foreground">AI Agents</div>
          </div>
          <div className="p-4 rounded-lg bg-card border">
            <div className="text-3xl font-bold text-primary">150x</div>
            <div className="text-sm text-muted-foreground">Faster Search</div>
          </div>
          <div className="p-4 rounded-lg bg-card border">
            <div className="text-3xl font-bold text-primary">213</div>
            <div className="text-sm text-muted-foreground">MCP Tools</div>
          </div>
          <div className="p-4 rounded-lg bg-card border">
            <div className="text-3xl font-bold text-primary">11</div>
            <div className="text-sm text-muted-foreground">AI Tasks</div>
          </div>
        </div>

        {/* Search Interface */}
        <SearchInterface />
      </section>

      {/* Stats Overview */}
      <section className="py-12">
        <StatsOverview />
      </section>

      {/* Features */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Powered by Advanced AI
        </h2>
        <Features />
      </section>

      {/* How It Works */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="p-6 rounded-lg bg-card border">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">1. Intelligent Search</h3>
            <p className="text-muted-foreground">
              66 specialized agents search across 100M+ papers in parallel using semantic understanding
            </p>
          </div>
          <div className="p-6 rounded-lg bg-card border">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-xl font-semibold mb-2">2. Cross-Domain Discovery</h3>
            <p className="text-muted-foreground">
              AI finds unexpected connections between different research fields (e.g., AI + Biology)
            </p>
          </div>
          <div className="p-6 rounded-lg bg-card border">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-xl font-semibold mb-2">3. Generate Insights</h3>
            <p className="text-muted-foreground">
              Receive summaries, citation graphs, trends, and novel research hypotheses
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-12 border-t">
        <h2 className="text-3xl font-bold text-center mb-8">
          Built with Cutting-Edge Technology
        </h2>
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {[
            'claude-flow',
            'agentic-flow',
            'agentdb',
            'ruv-swarm',
            'strange-loops',
            'sublinear-toolkit',
            'HuggingFace',
            'Next.js',
            'PostgreSQL',
            'Redis',
            'Neo4j',
            'MCP',
          ].map((tech) => (
            <div
              key={tech}
              className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium"
            >
              {tech}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
