import { GridContainer } from './GridContainer';
import { GridItemSchema } from '../utils/types';

export class SchemaManager {
  constructor(private grid: GridContainer) {}

  create(schema: GridItemSchema[]): void {
    schema.forEach((item) => this.grid.addItem(item.id, item));
  }

  updateItem(id: string, data: Partial<GridItemSchema>): void {
    this.grid.updateItem(id, data);
  }
}
