import { type GridItemSchema, type GridOptions } from '../utils/types.js';
import { VisualizationEngine } from './VisualizationEngine.js';

export class GridContainer {
  private container: HTMLElement;
  private items: Map<string, HTMLElement> = new Map();
  private columns: number;
  private gap: number;

  constructor(selector: string, options: GridOptions = {}) {
    const element = document.querySelector(selector);
    if (!element) throw new Error(`Container ${selector} not found`);

    this.container = element as HTMLElement;
    this.columns = options.columns || 12;
    this.gap = options.gap || 10;

    this.container.style.display = 'grid';
    this.container.style.gridTemplateColumns = `repeat(${this.columns}, 1fr)`;
    this.container.style.gap = `${this.gap}px`;
  }

  addItem(id: string, schema: GridItemSchema): void {
    if (this.items.has(id)) this.removeItem(id);

    const item = document.createElement('div');
    item.id = id;
    item.className = `vs-grid-item ${schema.className || ''}`;
    item.style.gridColumn = `span ${schema.width || 3}`;
    item.style.gridRow = `span ${schema.height || 3}`;

    // Render visualization
    const engine = new VisualizationEngine(item)

    engine.render()

    this.container.appendChild(item);
    this.items.set(id, item);
  }

  removeItem(id: string): void {
    const item = this.items.get(id);
    if (item) {
      item.remove();
      this.items.delete(id);
    }
  }

  updateItem(id: string, schema: Partial<GridItemSchema>): void {
    const item = this.items.get(id);
    if (!item) return;
    if (schema.width) item.style.gridColumn = `span ${schema.width}`;
    if (schema.height) item.style.gridRow = `span ${schema.height}`;
    if (schema.config || schema.data) {
      item.innerHTML = '';
      const chart = createChart(
        schema.type || 'bar-chart',
        schema.data || [],
        schema.config || {}
      );
      item.appendChild(chart);
    }
  }
}
