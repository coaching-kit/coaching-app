declare module 'react-plotly.js' {
  import { Component, CSSProperties } from 'react';
  import { PlotParams } from 'plotly.js';

  export interface PlotProps extends Partial<PlotParams> {
    data: Partial<PlotParams['data']>;
    layout?: Partial<PlotParams['layout']>;
    config?: Partial<PlotParams['config']>;
    // style prop is commonly used when embedding Plotly in React components
    style?: CSSProperties;
  }

  export default class Plot extends Component<PlotProps> {}
}
