import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PaperCard } from './PaperCard';
import type { Paper } from '@/lib/api-client';

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(() => Promise.resolve()),
  },
});

describe('PaperCard', () => {
  const mockPaper: Paper = {
    id: '1',
    title: 'Attention Is All You Need',
    authors: ['Vaswani, A.', 'Shazeer, N.', 'Parmar, N.'],
    year: 2017,
    abstract: 'We propose a new simple network architecture, the Transformer...',
    citations: 85000,
    domains: ['AI', 'NLP'],
    relevanceScore: 0.95,
  };

  it('should render paper title', () => {
    render(<PaperCard paper={mockPaper} />);

    expect(screen.getByText('Attention Is All You Need')).toBeInTheDocument();
  });

  it('should render authors', () => {
    render(<PaperCard paper={mockPaper} />);

    expect(screen.getByText(/Vaswani, A./)).toBeInTheDocument();
  });

  it('should render year', () => {
    render(<PaperCard paper={mockPaper} />);

    expect(screen.getByText('2017')).toBeInTheDocument();
  });

  it('should render citation count', () => {
    render(<PaperCard paper={mockPaper} />);

    expect(screen.getByText(/85,000 citations/)).toBeInTheDocument();
  });

  it('should render domains as tags', () => {
    render(<PaperCard paper={mockPaper} />);

    expect(screen.getByText('AI')).toBeInTheDocument();
    expect(screen.getByText('NLP')).toBeInTheDocument();
  });

  it('should render rank when provided', () => {
    render(<PaperCard paper={mockPaper} rank={1} />);

    expect(screen.getByText('#1')).toBeInTheDocument();
  });

  it('should not render rank when not provided', () => {
    render(<PaperCard paper={mockPaper} />);

    expect(screen.queryByText(/#\d+/)).not.toBeInTheDocument();
  });

  it('should render relevance score when available', () => {
    render(<PaperCard paper={mockPaper} />);

    expect(screen.getByText(/95.0%/)).toBeInTheDocument();
  });

  it('should expand abstract on button click', async () => {
    const user = userEvent.setup();
    render(<PaperCard paper={mockPaper} />);

    // Abstract should be collapsed initially
    const expandButton = screen.getByRole('button', { name: /show abstract/i });
    expect(expandButton).toBeInTheDocument();

    // Click to expand
    await user.click(expandButton);

    // Abstract should be visible
    expect(screen.getByText(/We propose a new simple network architecture/)).toBeInTheDocument();

    // Button text should change
    expect(screen.getByRole('button', { name: /hide abstract/i })).toBeInTheDocument();
  });

  it('should copy BibTeX to clipboard', async () => {
    const user = userEvent.setup();
    render(<PaperCard paper={mockPaper} />);

    const copyButton = screen.getByRole('button', { name: /copy bibtex/i });
    await user.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    expect(screen.getByText(/copied/i)).toBeInTheDocument();
  });

  it('should handle paper without optional fields', () => {
    const minimalPaper: Paper = {
      id: '2',
      title: 'Minimal Paper',
      authors: ['Author, A.'],
      abstract: 'Abstract text',
    };

    render(<PaperCard paper={minimalPaper} />);

    expect(screen.getByText('Minimal Paper')).toBeInTheDocument();
    expect(screen.getByText(/Author, A./)).toBeInTheDocument();
    expect(screen.queryByText(/citations/)).not.toBeInTheDocument();
    expect(screen.queryByText(/\d{4}/)).not.toBeInTheDocument(); // Year
  });

  it('should truncate long author lists', () => {
    const paperWithManyAuthors: Paper = {
      ...mockPaper,
      authors: Array.from({ length: 10 }, (_, i) => `Author ${i + 1}`),
    };

    render(<PaperCard paper={paperWithManyAuthors} />);

    // Should show "Author 1, Author 2, et al." or similar
    expect(screen.getByText(/Author 1/)).toBeInTheDocument();
    expect(screen.getByText(/et al/i)).toBeInTheDocument();
  });

  it('should apply hover styles', () => {
    const { container } = render(<PaperCard paper={mockPaper} />);

    const card = container.querySelector('.group');
    expect(card).toHaveClass('hover:shadow-lg');
  });
});
