import { type ChartData, type ChartConfig, type ChartType } from '../utils/types.js';

import * as d3 from "d3";

/**
 * BaseChart
 * ----------
 * Abstract class providing a consistent structure and utility functions
 * for all D3 chart implementations.
 *
 * All specific chart classes (BarChart, LineChart, PieChart, etc.)
 * should extend BaseChart and implement `render()`.
 */
export abstract class BaseChart {
  protected svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  protected width: number;
  protected height: number;
  protected margin: { top: number; right: number; bottom: number; left: number };
  protected container: HTMLElement;
  protected data: ChartData[];
  protected config: ChartConfig;

  constructor(container: HTMLElement, data: ChartData[], config: ChartConfig = {}) {
    this.container = container;
    this.data = data;
    this.config = config;

    // --- Dimensions ---
    this.width = config.width || container.clientWidth || 400;
    this.height = config.height || container.clientHeight || 300;

    // --- Margins (used for axes) ---
    this.margin = {
      top: config.marginTop ?? 30,
      right: config.marginRight ?? 30,
      bottom: config.marginBottom ?? 40,
      left: config.marginLeft ?? 50,
    };

    // --- Initialize SVG ---
    this.svg = d3
      .select(this.container)
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("class", "vs-chart");

    // --- Prepare Tooltip Div ---
    this.initTooltip();
  }

  /** Must be implemented by concrete chart classes. */
  abstract render(): void;

  /** Clear chart and re-render with new data */
  updateData(data: ChartData[]) {
    this.data = data;
    this.clear();
    this.render();
  }

  /** Update chart configuration and re-render */
  updateConfig(config: Partial<ChartConfig>) {
    this.config = { ...this.config, ...config };
    this.clear();
    this.render();
  }

  /** Remove all SVG elements before re-rendering */
  protected clear() {
    this.svg.selectAll("*").remove();
  }

  /** Adds a chart title */
  protected addTitle(title?: string) {
    if (!title) return;
    this.svg
      .append("text")
      .attr("x", this.width / 2)
      .attr("y", this.margin.top / 2)
      .attr("text-anchor", "middle")
      .attr("class", "vs-chart-title")
      .style("font-size", this.config.titleFontSize || "14px")
      .style("font-weight", "bold")
      .text(title);
  }

  /** Initializes a hidden tooltip element */
  private initTooltip() {
    const tooltipId = "vs-tooltip";
    if (!document.getElementById(tooltipId)) {
      const tip = document.createElement("div");
      tip.id = tooltipId;
      tip.style.position = "fixed";
      tip.style.display = "none";
      tip.style.pointerEvents = "none";
      tip.style.padding = "4px 8px";
      tip.style.background = "rgba(0,0,0,0.75)";
      tip.style.color = "#fff";
      tip.style.borderRadius = "4px";
      tip.style.fontSize = "12px";
      tip.style.zIndex = "9999";
      document.body.appendChild(tip);
    }
  }

  /** Gets a reference to the shared tooltip element */
  protected tooltip(): HTMLElement {
    return document.getElementById("vs-tooltip")!;
  }
}
