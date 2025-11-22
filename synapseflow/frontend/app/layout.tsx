import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Header } from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SynapseFlow - Self-Learning AI Research Assistant',
  description: 'Accelerate research discovery from months to hours with cross-domain AI insights',
  keywords: ['AI', 'research', 'assistant', 'knowledge discovery', 'cross-domain', 'self-learning'],
  authors: [{ name: 'SynapseFlow Team' }],
  openGraph: {
    title: 'SynapseFlow - Self-Learning AI Research Assistant',
    description: 'Accelerate research discovery from months to hours',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <footer className="border-t py-6 px-4 text-center text-sm text-muted-foreground">
              <p>
                Built with claude-flow, agentic-flow, agentdb, ruv-swarm, strange-loops, and HuggingFace
              </p>
              <p className="mt-2">
                © 2025 SynapseFlow. Powered by 66 AI agents and 213 MCP tools.
              </p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
}
