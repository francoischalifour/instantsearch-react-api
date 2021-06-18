import { DetailedHTMLProps, HTMLAttributes, ReactNode, useState } from 'react';
import { PanelContext } from './PanelContext';
import { cx } from './utils';

type PanelProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  header?: string | JSX.Element;
  footer?: string | JSX.Element;
  children: ReactNode;
};

export function Panel(props: PanelProps) {
  const { header, footer, children, ...rest } = props;
  const [canRefine, setCanRefine] = useState(true);

  return (
    <div
      className={cx(
        'ais-Panel',
        canRefine === false && 'ais-Panel-noRefinement'
      )}
      {...rest}
    >
      {header && <div className="ais-Panel-header">{header}</div>}

      <PanelContext.Provider value={{ setCanRefine }}>
        {children}
      </PanelContext.Provider>

      {footer && <div className="ais-Panel-footer">{footer}</div>}
    </div>
  );
}
