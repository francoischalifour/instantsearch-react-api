import { useSearchIndexResults } from './useSearchIndexResults';
import { useSearchStatus } from './useSearchStatus';

export type NoResultsBoundaryProps = {
  children: React.ReactNode;
  fallback: React.ReactNode;
};

export function NoResultsBoundary({
  fallback,
  children,
}: NoResultsBoundaryProps) {
  const results = useSearchIndexResults();
  const { status } = useSearchStatus();

  if (
    !results._isFallbackResult &&
    results.nbHits === 0 &&
    status !== 'stalled'
  ) {
    return fallback;
  }

  return children;
}
