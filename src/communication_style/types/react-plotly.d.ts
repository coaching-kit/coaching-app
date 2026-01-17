declare module 'react-plotly.js' {
  import { Component } from 'react';
  import { PlotParams } from 'plotly.js';

  export interface PlotProps extends Partial<PlotParams> {
    data: Partial<PlotParams['data']>;
    layout?: Partial<PlotParams['layout']>;
    config?: Partial<PlotParams['config']>;
  }

  export default class Plot extends Component<PlotProps> {}
}
