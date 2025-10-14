import {
  type ChartType,
  type ChartData,
  type ChartConfig,
} from "../utils/types.js";
import { ChartRegistry } from "../charts/ChartRegistry.js";

export class VisualizationEngine {
  private container: HTMLElement;
  constructor(container: HTMLElement) {
    this.container = container;
  }
  render(type: ChartType, data: ChartData[], config: ChartConfig) {
    this.container.innerHTML = "";
    const chart = ChartRegistry.create(type, this.container, data, config);
    chart.render();
    return chart;
  }
}
