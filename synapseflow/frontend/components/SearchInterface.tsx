'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Sparkles } from 'lucide-react'

export function SearchInterface() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [domains, setDomains] = useState<string[]>([])
  const [domainInput, setDomainInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    // Navigate to research page with query parameters
    const params = new URLSearchParams({
      q: query,
      ...(domains.length > 0 && { domains: domains.join(',') }),
    })

    router.push(`/research?${params.toString()}`)
  }

  const addDomain = () => {
    if (domainInput.trim() && !domains.includes(domainInput.trim())) {
      setDomains([...domains, domainInput.trim()])
      setDomainInput('')
    }
  }

  const removeDomain = (domain: string) => {
    setDomains(domains.filter((d) => d !== domain))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && domainInput.trim()) {
      e.preventDefault()
      addDomain()
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your research query (e.g., 'transformer applications in biology')..."
            className="w-full pl-12 pr-4 py-4 text-lg rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        {/* Domain Filter */}
        <div className="flex flex-wrap gap-2 items-center">
          <label className="text-sm text-muted-foreground">Domains (optional):</label>
          {domains.map((domain) => (
            <span
              key={domain}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
            >
              {domain}
              <button
                type="button"
                onClick={() => removeDomain(domain)}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                ×
              </button>
            </span>
          ))}
          <input
            type="text"
            value={domainInput}
            onChange={(e) => setDomainInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={addDomain}
            placeholder="Add domain (e.g., AI, Biology)"
            className="flex-1 min-w-[150px] px-3 py-1 text-sm rounded-md border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={!query.trim()}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
          >
            <Sparkles className="h-5 w-5" />
            Start Research
          </button>
        </div>

        {/* Quick Examples */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Try: </p>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {[
              'transformer applications in drug discovery',
              'quantum computing in cryptography',
              'reinforcement learning for robotics',
            ].map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => setQuery(example)}
                className="px-3 py-1 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground text-xs transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  )
}
