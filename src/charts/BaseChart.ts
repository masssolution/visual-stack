import { ChartData, ChartConfig, ChartType } from '../utils/types';
import { BarChart } from './BarChart';
import { LineChart } from './LineChart';
import { PieChart } from './PieChart';

export function createChart(
  type: ChartType,
  data: ChartData[],
  config: ChartConfig = {}
): HTMLElement {
  const container = document.createElement('div');
  container.className = 'vs-chart';
  container.style.width = `${config.width || 300}px`;
  container.style.height = `${config.height || 200}px`;

  switch (type) {
    case 'bar-chart':
      new BarChart(container, data, config);
      break;
    case 'line-chart':
      new LineChart(container, data, config);
      break;
    case 'pie-chart':
      new PieChart(container, data, config);
      break;
    default:
      container.innerText = 'Unsupported chart type';
  }

  return container;
}
