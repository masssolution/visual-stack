import { ChartRegistry } from './charts/ChartRegistry';
import { BarChart } from './charts/charts/BarChart';
import { LineChart } from './charts/charts/LineChart';
import { PieChart } from './charts/charts/PieChart';
import { ScatterPlot } from './charts/charts/ScatterPlot';
import { AreaChart } from './charts/charts/AreaChart';
import { Heatmap } from './charts/charts/Heatmap';
import { TreeMap } from './charts/charts/TreeMap';
import { ForceGraph } from './charts/charts/ForceGraph';

ChartRegistry.register('bar-chart', BarChart);
ChartRegistry.register('line-chart', LineChart);
ChartRegistry.register('pie-chart', PieChart);
ChartRegistry.register('scatter-plot', ScatterPlot);
ChartRegistry.register('area-chart', AreaChart);
ChartRegistry.register('heatmap', Heatmap);
ChartRegistry.register('tree-map', TreeMap);
ChartRegistry.register('force-graph', ForceGraph);

export * from './core/GridContainer';
export * from './core/SchemaManager';
export * from './core/VisualizationEngine';
export * from './utils/types';
