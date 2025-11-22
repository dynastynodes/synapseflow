'use client'

import { useState, useEffect } from 'react'
import { Cpu, CheckCircle, Loader2 } from 'lucide-react'

const agents = [
  'PaperScraperAgent',
  'SummarizerAgent',
  'EntityExtractorAgent',
  'CrossDomainAgent',
  'CitationAnalysisAgent',
  'TrendAnalysisAgent',
  'HypothesisGeneratorAgent',
  'DocumentQAAgent',
]

export function AgentStatus() {
  const [activeAgents, setActiveAgents] = useState<Set<string>>(new Set())
  const [completedAgents, setCompletedAgents] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Simulate agents becoming active and completing
    agents.forEach((agent, index) => {
      setTimeout(() => {
        setActiveAgents((prev) => new Set(prev).add(agent))

        setTimeout(() => {
          setCompletedAgents((prev) => new Set(prev).add(agent))
          setActiveAgents((prev) => {
            const next = new Set(prev)
            next.delete(agent)
            return next
          })
        }, 2000 + Math.random() * 3000)
      }, index * 500)
    })
  }, [])

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground">Agent Activity</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {agents.map((agent) => {
          const isActive = activeAgents.has(agent)
          const isCompleted = completedAgents.has(agent)

          return (
            <div
              key={agent}
              className={`flex items-center gap-2 p-3 rounded-md border transition-all ${
                isActive
                  ? 'border-primary bg-primary/5'
                  : isCompleted
                  ? 'border-green-500/50 bg-green-500/5'
                  : 'border-border'
              }`}
            >
              {isActive && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
              {isCompleted && <CheckCircle className="h-4 w-4 text-green-500" />}
              {!isActive && !isCompleted && <Cpu className="h-4 w-4 text-muted-foreground" />}

              <span
                className={`text-sm font-medium ${
                  isActive
                    ? 'text-primary'
                    : isCompleted
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-muted-foreground'
                }`}
              >
                {agent}
              </span>

              {isActive && (
                <span className="ml-auto text-xs text-primary animate-pulse">Running...</span>
              )}
              {isCompleted && (
                <span className="ml-auto text-xs text-green-600 dark:text-green-400">Done</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
