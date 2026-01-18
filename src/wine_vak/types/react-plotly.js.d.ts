declare module 'react-plotly.js' {
  import { Component } from 'react';
  import { PlotParams } from 'plotly.js';

  export interface PlotProps extends Partial<PlotParams> {
    data: Partial<PlotParams['data']>;
    layout?: Partial<PlotParams['layout']>;
    config?: Partial<PlotParams['config']>;
    frames?: Partial<PlotParams['frames']>;
    onInitialized?: (figure: Readonly<PlotParams>, graphDiv: Readonly<HTMLElement>) => void;
    onUpdate?: (figure: Readonly<PlotParams>, graphDiv: Readonly<HTMLElement>) => void;
    onPurge?: (figure: Readonly<PlotParams>, graphDiv: Readonly<HTMLElement>) => void;
    onError?: (err: Readonly<Error>) => void;
    onBeforeHover?: (event: Readonly<any>) => boolean | void;
    onHover?: (event: Readonly<any>) => void;
    onUnhover?: (event: Readonly<any>) => void;
    onSelected?: (event: Readonly<any>) => void;
    onClick?: (event: Readonly<any>) => void;
    onBeforeExport?: () => void;
    onAfterExport?: () => void;
    onAnimated?: () => void;
    onAnimatingFrame?: (event: Readonly<any>) => void;
    onAnimationInterrupted?: () => void;
    onDoubleClick?: () => void;
    onRedraw?: () => void;
    onRelayout?: (event: Readonly<any>) => void;
    onRestyle?: (event: Readonly<any>) => void;
    onWebGlContextLost?: () => void;
    style?: React.CSSProperties;
    className?: string;
    useResizeHandler?: boolean;
    debug?: boolean;
    divId?: string;
  }

  export default class Plot extends Component<PlotProps> {}
}
