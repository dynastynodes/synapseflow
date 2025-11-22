'use client'

import { useState } from 'react'
import type { Paper } from '@/lib/api-client'
import {
  FileText,
  Users,
  Calendar,
  ExternalLink,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { formatAuthors, generateBibTeX, copyToClipboard, formatNumber } from '@/lib/utils'

interface PaperCardProps {
  paper: Paper
  rank?: number
}

export function PaperCard({ paper, rank }: PaperCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyBibTeX = async () => {
    const bibtex = generateBibTeX(paper)
    const success = await copyToClipboard(bibtex)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const relevanceScore = paper.relevanceScore
    ? (paper.relevanceScore * 100).toFixed(1)
    : null

  return (
    <div className="group p-6 rounded-lg bg-card border hover:shadow-lg transition-all">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {rank && (
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-lg font-bold text-primary">#{rank}</span>
          </div>
        )}

        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
            {paper.title}
          </h3>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
            {/* Authors */}
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{formatAuthors(paper.authors, 2)}</span>
            </div>

            {/* Year */}
            {paper.year && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{paper.year}</span>
              </div>
            )}

            {/* Citations */}
            {paper.citations !== undefined && (
              <div className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>{formatNumber(paper.citations)} citations</span>
              </div>
            )}
          </div>

          {/* Domains */}
          {paper.domains && paper.domains.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {paper.domains.map((domain) => (
                <span
                  key={domain}
                  className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium"
                >
                  {domain}
                </span>
              ))}
            </div>
          )}

          {/* Relevance Score */}
          {relevanceScore && (
            <div className="mb-3">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${relevanceScore}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-primary">{relevanceScore}%</span>
              </div>
              <span className="text-xs text-muted-foreground">Relevance Score</span>
            </div>
          )}

          {/* Abstract (Expandable) */}
          {paper.abstract && (
            <div className="mb-4">
              <p
                className={`text-sm text-foreground ${
                  !isExpanded ? 'line-clamp-3' : ''
                }`}
              >
                {paper.abstract}
              </p>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-sm text-primary hover:underline flex items-center gap-1"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    Show less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    Show more
                  </>
                )}
              </button>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            {paper.url && (
              <a
                href={paper.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                View Paper
              </a>
            )}

            <button
              onClick={handleCopyBibTeX}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border text-sm font-medium hover:bg-accent transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy BibTeX
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
