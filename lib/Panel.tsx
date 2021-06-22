import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { PanelContext } from './PanelContext';
import { cx } from './utils';

type PanelWrapperProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  header?: string | JSX.Element;
  footer?: string | JSX.Element;
  children: ReactNode;
  isCollapsed?(params: object): boolean;
  isHidden?(params: object): boolean;
  collapsible?: boolean;
};

export function Panel(props: PanelWrapperProps) {
  const {
    header,
    footer,
    children,
    isCollapsed = () => false,
    isHidden = () => false,
    collapsible,
    ...rest
  } = props;
  const [hidden, setHidden] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isControlled, setIsControlled] = useState(false);
  const [renderState, setRenderState] = useState<null | object>(null);

  useEffect(() => {
    if (!renderState) {
      return;
    }

    if (!isControlled) {
      setCollapsed(isCollapsed(renderState));
    }

    setHidden(isHidden(renderState));
  }, [renderState]);

  return (
    <div
      className={cx(
        'ais-Panel',
        hidden && 'ais-Panel-noRefinement',
        Boolean(collapsible) && 'ais-Panel--collapsible',
        collapsed && 'ais-Panel--collapsed'
      )}
      hidden={hidden}
      {...rest}
    >
      {header && (
        <div className="ais-Panel-header">
          <span>{header}</span>
          {collapsible && (
            <button
              className="ais-Panel-collapseButton"
              aria-expanded={!isCollapsed}
              onClick={(event) => {
                event.preventDefault();

                setIsControlled(true);
                setCollapsed((prevIsCollapsed) => !prevIsCollapsed);
              }}
            >
              <svg
                className="ais-Panel-collapseIcon"
                width="1em"
                height="1em"
                viewBox="0 0 500 500"
              >
                {collapsed ? (
                  <path d="M100 250l300-150v300z" fill="currentColor" />
                ) : (
                  <path d="M250 400l150-300H100z" fill="currentColor" />
                )}
              </svg>
            </button>
          )}
        </div>
      )}

      <div className="ais-Panel-body">
        <PanelContext.Provider
          value={{
            onRenderState: setRenderState,
          }}
        >
          {children}
        </PanelContext.Provider>
      </div>

      {footer && <div className="ais-Panel-footer">{footer}</div>}
    </div>
  );
}
