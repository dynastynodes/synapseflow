'use client'

import { useStats, useHealth } from '@/lib/hooks'
import { Activity, Database, Cpu, Zap } from 'lucide-react'
import { formatNumber, formatLatency } from '@/lib/utils'

export function StatsOverview() {
  const { data: stats, isLoading: statsLoading } = useStats()
  const { data: health, isLoading: healthLoading } = useHealth()

  if (statsLoading || healthLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-6 rounded-lg bg-card border animate-pulse">
            <div className="h-12 w-12 bg-muted rounded-lg mb-4" />
            <div className="h-6 w-20 bg-muted rounded mb-2" />
            <div className="h-4 w-32 bg-muted rounded" />
          </div>
        ))}
      </div>
    )
  }

  const cards = [
    {
      icon: Database,
      label: 'Total Papers',
      value: stats?.totalPapers ? formatNumber(stats.totalPapers) : '0',
      description: 'Indexed in vector database',
      color: 'text-blue-500',
    },
    {
      icon: Cpu,
      label: 'Active Agents',
      value: stats?.totalAgents || '66',
      description: 'Specialized AI agents',
      color: 'text-green-500',
    },
    {
      icon: Zap,
      label: 'Avg Latency',
      value: stats?.avgLatency || '< 500ms',
      description: '150x faster search',
      color: 'text-yellow-500',
    },
    {
      icon: Activity,
      label: 'System Status',
      value: health?.status === 'healthy' ? 'Healthy' : 'Unknown',
      description: `Uptime: ${stats?.uptime ? formatLatency(stats.uptime * 1000) : 'N/A'}`,
      color: 'text-purple-500',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.label}
            className="p-6 rounded-lg bg-card border hover:shadow-lg transition-shadow"
          >
            <Icon className={`h-10 w-10 ${card.color} mb-4`} />
            <div className="text-2xl font-bold mb-1">{card.value}</div>
            <div className="text-sm font-medium text-foreground mb-1">{card.label}</div>
            <div className="text-xs text-muted-foreground">{card.description}</div>
          </div>
        )
      })}
    </div>
  )
}
