import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner, PageSpinner } from '@/components/shared/Spinner';

describe('Spinner', () => {
  it('renders with default aria-label', () => {
    render(<Spinner />);
    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
  });

  it('renders sm, md, lg sizes without crashing', () => {
    const { rerender } = render(<Spinner size="sm" />);
    rerender(<Spinner size="md" />);
    rerender(<Spinner size="lg" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Spinner className="text-red-500" />);
    expect(screen.getByRole('status')).toHaveClass('text-red-500');
  });
});

describe('PageSpinner', () => {
  it('renders a full-page spinner', () => {
    render(<PageSpinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
