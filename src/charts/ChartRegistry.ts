import { ChartType, ChartConstructor } from '../utils/types';

export class ChartRegistry {
  private static registry: Map<ChartType, ChartConstructor> = new Map();

  static register(type: ChartType, constructor: ChartConstructor) {
    ChartRegistry.registry.set(type, constructor);
  }

  static create(type: ChartType, container: HTMLElement, data: any, config: any) {
    const ChartClass = ChartRegistry.registry.get(type);
    if (!ChartClass) throw new Error(`Chart type "${type}" not registered`);
    return new ChartClass(container, data, config);
  }

  static listTypes(): ChartType[] {
    return Array.from(ChartRegistry.registry.keys());
  }
}
