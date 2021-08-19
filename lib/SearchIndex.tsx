import { IndexContext } from './IndexContext';
import { useIndex, UseIndexProps } from './useIndex';

export type IndexProps = UseIndexProps & {
  children: React.ReactNode;
};

export function Index({ children, ...props }: IndexProps) {
  const index = useIndex(props);

  return (
    <IndexContext.Provider value={index}>{children}</IndexContext.Provider>
  );
}
