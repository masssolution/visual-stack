import { arc, format, pie, select } from 'd3';
import type { PieArcDatum } from 'd3';
import { createChart } from './charts.js';
import type { BarData } from './charts.js';

export interface VisualizationContract {
  readonly version: '1';
  readonly kind: 'bar' | 'donut';
  readonly title: string;
  readonly unit: string;
  readonly data: readonly BarData[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function keysMatch(value: Record<string, unknown>, expected: string[]) {
  return Object.keys(value).length === expected.length && expected.every((key) => key in value);
}

export function parseVisualizationContract(value: unknown): VisualizationContract {
  if (!isRecord(value) || !keysMatch(value, ['version', 'kind', 'title', 'unit', 'data'])
    || value.version !== '1' || (value.kind !== 'bar' && value.kind !== 'donut')
    || typeof value.title !== 'string' || !value.title.trim()
    || typeof value.unit !== 'string' || !Array.isArray(value.data) || value.data.length === 0) {
    throw new TypeError('Invalid visualization contract: expected a version 1 bar or donut chart.');
  }
  const data = value.data.map((entry: unknown) => {
    if (!isRecord(entry) || !keysMatch(entry, ['label', 'value'])
      || typeof entry.label !== 'string' || !entry.label.trim()
      || typeof entry.value !== 'number' || !Number.isFinite(entry.value) || entry.value < 0) {
      throw new TypeError('Invalid visualization contract: chart data requires a label and non-negative finite value.');
    }
    return { label: entry.label, value: entry.value };
  });
  if (value.kind === 'donut' && !data.some((entry) => entry.value > 0)) {
    throw new TypeError('Invalid visualization contract: a donut requires a positive total.');
  }
  return { version: '1', kind: value.kind, title: value.title, unit: value.unit, data };
}

export function renderVisualization(element: HTMLElement, value: unknown) {
  const contract = parseVisualizationContract(value);
  if (contract.kind === 'bar') {
    return createChart(element, { kind: 'bar', title: contract.title, unit: contract.unit, data: contract.data });
  }

  element.replaceChildren();
  const root = select(element);
  const chart = root.append('svg').attr('role', 'img').attr('aria-label', contract.title)
    .attr('viewBox', '0 0 220 180').attr('width', '100%').attr('height', 180);
  const maxValue = contract.data.reduce((max, entry) => Math.max(max, entry.value), 0);
  const slices = pie<BarData>().sort(null).value((entry) => entry.value / maxValue)([...contract.data]);
  const total = slices.reduce((sum, slice) => sum + slice.value, 0);
  const colors = ['#6fa3cf', '#d99460', '#93b369', '#b084ac', '#6fbdbd', '#c29f5f'];
  const color = (index: number) => colors[index % colors.length] ?? '#6fa3cf';
  const percent = format('.1%');
  const describe = (slice: PieArcDatum<BarData>) => `${slice.data.label}: ${percent(slice.value / total)}`;
  chart.append('g').attr('transform', 'translate(110,90)').selectAll('path').data(slices).join('path')
    .attr('d', arc<PieArcDatum<BarData>>().innerRadius(46).outerRadius(80))
    .attr('fill', (_, index) => color(index)).attr('stroke', 'var(--panel, #171b1a)')
    .append('title').text(describe);
  const legend = root.append('ul').attr('class', 'chart-legend');
  const entries = legend.selectAll('li').data(slices).join('li');
  entries.append('svg').attr('aria-hidden', 'true').attr('width', 10).attr('height', 10)
    .append('circle').attr('cx', 5).attr('cy', 5).attr('r', 4).attr('fill', (_, index) => color(index));
  entries.append('span').text(describe);

  return { destroy: () => element.replaceChildren() };
}
