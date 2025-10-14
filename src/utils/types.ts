export interface ChartData {
  label: string;
  value: number | string;
}

export interface ChartConfig {
  title?: string;
  color?: string;
  width?: number;
  height?: number;
  axis?: {
    x?: string;
    y?: string;
  };
  [key: string]: any;
}

export type ChartType = "bar-chart" | "line-chart" | "pie-chart";

export interface GridItemSchema {
  id: string;
  type: ChartType;
  data: ChartData[];
  config?: ChartConfig;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  className?: string;
}

export interface GridOptions {
  columns?: number;
  gap?: number;
  responsive?: boolean;
}

export interface VisualStackInstance {
  addItem(id: string, schema: GridItemSchema): void;
  removeItem(id: string): void;
  updateItem(id: string, schema: Partial<GridItemSchema>): void;
}
