import { ChartRegistry } from "./charts/ChartRegistry.js";
import { BarChart } from "./charts/charts/BarChart.js";
import { LineChart } from "./charts/charts/LineChart.js";
import { PieChart } from "./charts/charts/PieChart.js";
import { GridContainer } from "./core/GridContainer.js";
import { SchemaManager } from "./core/SchemaManager.js";
import { VisualizationEngine } from "./core/VisualizationEngine.js";
import type {
  ChartConfig,
  ChartData,
  ChartType,
  GridItemSchema,
  GridOptions,
} from "./utils/types.js";

ChartRegistry.register("bar-chart", BarChart);
ChartRegistry.register("line-chart", LineChart);
ChartRegistry.register("pie-chart", PieChart);

export default class VisualStack {
  /**
   * Creates new GridContainer instance.
   * @param selector string CSS Selector
   * @param options GridOtpions
   * @returns GridContainer
   */
  static GridContainer(selector: string, options: GridOptions) {
    return new GridContainer(selector, options);
  }
  /**
   * Create a chart directly without a grid (standalone chart mode).
   * @param selector - DOM selector or container element
   * @param type - chart type (bar, line, pie, etc.)
   * @param data - data array for chart
   * @param config - chart configuration options
   */
  static create(
    selector: string,
    type: ChartType,
    data: ChartData[],
    config: ChartConfig
  ) {
    const container =
      typeof selector === "string"
        ? (document.querySelector(selector) as HTMLElement)
        : selector;
    const engine = new VisualizationEngine(container);
    engine.render(type, data, config);
    return engine;
  }

  /**
   * Render grid and visualizations based on schema configuration.
   * @param selector - container where grid will be rendered
   * @param schema - schema object or array describing layout and visualizations
   */
  static Schema(selector: string, schema: GridItemSchema[]) {
    const container = new GridContainer(selector);
    const schemaManager = new SchemaManager(container);
    schemaManager.create(schema);
    return schemaManager;
  }
}
