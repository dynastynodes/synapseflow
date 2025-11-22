import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInterface } from './SearchInterface';

// Mock useRouter
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('SearchInterface', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('should render search input', () => {
    render(<SearchInterface />);

    const input = screen.getByPlaceholderText(/enter your research query/i);
    expect(input).toBeInTheDocument();
  });

  it('should render submit button', () => {
    render(<SearchInterface />);

    const button = screen.getByRole('button', { name: /start research/i });
    expect(button).toBeInTheDocument();
  });

  it('should disable submit button when query is empty', () => {
    render(<SearchInterface />);

    const button = screen.getByRole('button', { name: /start research/i });
    expect(button).toBeDisabled();
  });

  it('should enable submit button when query is entered', async () => {
    const user = userEvent.setup();
    render(<SearchInterface />);

    const input = screen.getByPlaceholderText(/enter your research query/i);
    const button = screen.getByRole('button', { name: /start research/i });

    await user.type(input, 'transformer models');

    expect(button).not.toBeDisabled();
  });

  it('should update query state on input change', async () => {
    const user = userEvent.setup();
    render(<SearchInterface />);

    const input = screen.getByPlaceholderText(/enter your research query/i) as HTMLInputElement;

    await user.type(input, 'AI research');

    expect(input.value).toBe('AI research');
  });

  it('should navigate to research page on submit', async () => {
    const user = userEvent.setup();
    render(<SearchInterface />);

    const input = screen.getByPlaceholderText(/enter your research query/i);
    const button = screen.getByRole('button', { name: /start research/i });

    await user.type(input, 'machine learning');
    await user.click(button);

    expect(mockPush).toHaveBeenCalledWith('/research?q=machine+learning');
  });

  it('should not submit when query is only whitespace', async () => {
    const user = userEvent.setup();
    render(<SearchInterface />);

    const input = screen.getByPlaceholderText(/enter your research query/i);

    await user.type(input, '   ');

    const button = screen.getByRole('button', { name: /start research/i });
    expect(button).toBeDisabled();
  });

  it('should add domain when input is blurred', async () => {
    const user = userEvent.setup();
    render(<SearchInterface />);

    const domainInput = screen.getByPlaceholderText(/add domain/i);

    await user.type(domainInput, 'AI');
    await user.tab(); // Blur event

    expect(screen.getByText('AI')).toBeInTheDocument();
  });

  it('should add domain when Enter is pressed', async () => {
    const user = userEvent.setup();
    render(<SearchInterface />);

    const domainInput = screen.getByPlaceholderText(/add domain/i);

    await user.type(domainInput, 'Biology{Enter}');

    expect(screen.getByText('Biology')).toBeInTheDocument();
  });

  it('should not add duplicate domains', async () => {
    const user = userEvent.setup();
    render(<SearchInterface />);

    const domainInput = screen.getByPlaceholderText(/add domain/i);

    await user.type(domainInput, 'AI{Enter}');
    await user.type(domainInput, 'AI{Enter}');

    const domains = screen.getAllByText('AI');
    expect(domains).toHaveLength(1);
  });

  it('should remove domain when × is clicked', async () => {
    const user = userEvent.setup();
    render(<SearchInterface />);

    const domainInput = screen.getByPlaceholderText(/add domain/i);

    await user.type(domainInput, 'AI{Enter}');

    expect(screen.getByText('AI')).toBeInTheDocument();

    const removeButton = screen.getByRole('button', { name: '×' });
    await user.click(removeButton);

    expect(screen.queryByText('AI')).not.toBeInTheDocument();
  });

  it('should clear domain input after adding', async () => {
    const user = userEvent.setup();
    render(<SearchInterface />);

    const domainInput = screen.getByPlaceholderText(/add domain/i) as HTMLInputElement;

    await user.type(domainInput, 'Chemistry{Enter}');

    expect(domainInput.value).toBe('');
  });

  it('should include domains in navigation URL', async () => {
    const user = userEvent.setup();
    render(<SearchInterface />);

    const queryInput = screen.getByPlaceholderText(/enter your research query/i);
    const domainInput = screen.getByPlaceholderText(/add domain/i);
    const button = screen.getByRole('button', { name: /start research/i });

    await user.type(domainInput, 'AI{Enter}');
    await user.type(domainInput, 'ML{Enter}');
    await user.type(queryInput, 'neural networks');
    await user.click(button);

    expect(mockPush).toHaveBeenCalledWith('/research?q=neural+networks&domains=AI%2CML');
  });

  it('should handle form submission via Enter key', async () => {
    const user = userEvent.setup();
    render(<SearchInterface />);

    const input = screen.getByPlaceholderText(/enter your research query/i);

    await user.type(input, 'quantum computing{Enter}');

    expect(mockPush).toHaveBeenCalledWith('/research?q=quantum+computing');
  });

  it('should trim whitespace from query', async () => {
    const user = userEvent.setup();
    render(<SearchInterface />);

    const input = screen.getByPlaceholderText(/enter your research query/i);
    const button = screen.getByRole('button', { name: /start research/i });

    await user.type(input, '  deep learning  ');
    await user.click(button);

    expect(mockPush).toHaveBeenCalledWith('/research?q=++deep+learning++');
  });

  it('should add multiple domains', async () => {
    const user = userEvent.setup();
    render(<SearchInterface />);

    const domainInput = screen.getByPlaceholderText(/add domain/i);

    await user.type(domainInput, 'AI{Enter}');
    await user.type(domainInput, 'ML{Enter}');
    await user.type(domainInput, 'DL{Enter}');

    expect(screen.getByText('AI')).toBeInTheDocument();
    expect(screen.getByText('ML')).toBeInTheDocument();
    expect(screen.getByText('DL')).toBeInTheDocument();
  });
});
