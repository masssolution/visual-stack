import { type ChartConfig, type ChartData, type ChartType, ChartConstructor } from '../utils/types.js';

export class ChartRegistry {
  private static registry: Map<ChartType, ChartConstructor> = new Map();

  static register(type: ChartType, constructor: ChartConstructor) {
    ChartRegistry.registry.set(type, constructor);
  }

  static create(type: ChartType, container: HTMLElement, data: ChartData[], config: ChartConfig) {
    const ChartClass = ChartRegistry.registry.get(type);
    if (!ChartClass) throw new Error(`Chart type "${type}" not registered`);
    return new ChartClass(container, data, config);
  }

  static listTypes(): ChartType[] {
    return Array.from(ChartRegistry.registry.keys());
  }
}
