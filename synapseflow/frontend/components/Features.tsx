import {
  Brain,
  Zap,
  Network,
  TrendingUp,
  Lightbulb,
  GitBranch,
} from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: '150x Faster Search',
    description:
      'Vector-based semantic search across 100M+ papers using agentdb with HNSW indexing',
    highlight: 'Sub-500ms latency',
  },
  {
    icon: Brain,
    title: '66 AI Agents',
    description:
      'Specialized agents work in parallel: PaperScraper, Summarizer, EntityExtractor, CrossDomain, and more',
    highlight: '1,000 papers/min',
  },
  {
    icon: Network,
    title: 'Cross-Domain Discovery',
    description:
      'Find unexpected connections between different research fields using sentence similarity and temporal analysis',
    highlight: 'Novel insights',
  },
  {
    icon: TrendingUp,
    title: 'Self-Learning',
    description:
      'Reinforcement learning adapts to your preferences, improving recommendations by 20% monthly',
    highlight: 'Gets smarter',
  },
  {
    icon: Lightbulb,
    title: 'Hypothesis Generation',
    description:
      'AI generates novel research hypotheses based on cross-domain insights and literature analysis',
    highlight: 'Powered by Llama-3.1',
  },
  {
    icon: GitBranch,
    title: 'Citation Networks',
    description:
      'Interactive graph visualization with PageRank to identify influential papers and research clusters',
    highlight: 'D3.js powered',
  },
]

export function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature) => {
        const Icon = feature.icon
        return (
          <div
            key={feature.title}
            className="group p-6 rounded-lg bg-card border hover:border-primary transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{feature.description}</p>
                <span className="inline-block px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">
                  {feature.highlight}
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
