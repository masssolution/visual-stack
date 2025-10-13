import * as d3 from 'd3';
import { ChartData, ChartConfig } from '../utils/types';

export class BarChart {
  constructor(container: HTMLElement, data: ChartData[], config: ChartConfig) {
    const width = config.width || 300;
    const height = config.height || 200;
    const color = config.color || '#4caf50';

    const svg = d3
      .select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, width])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)!])
      .range([height, 0]);

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.label)!)
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.value))
      .attr('fill', color)
      .on('mouseover', function () {
        d3.select(this).attr('fill', d3.color(color)!.darker(1)?.toString() || color);
      })
      .on('mouseout', function () {
        d3.select(this).attr('fill', color);
      });
  }
}
