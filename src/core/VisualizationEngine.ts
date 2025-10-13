import { ChartType, ChartData, ChartConfig } from '../utils/types';
import { ChartRegistry } from '../charts/ChartRegistry';

export class VisualizationEngine {
  static render(container: HTMLElement, type: ChartType, data: ChartData[], config: ChartConfig) {
    container.innerHTML = '';
    const chart = ChartRegistry.create(type, container, data, config);
    chart.render();
    return chart;
  }
}
