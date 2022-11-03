import {Entity, model, property} from '@loopback/repository';

@model()
export class CategoriaPro extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
  })
  id_producto?: string;

  @property({
    type: 'string',
  })
  categoriaId?: string;

  constructor(data?: Partial<CategoriaPro>) {
    super(data);
  }
}

export interface CategoriaProRelations {
  // describe navigational properties here
}

export type CategoriaProWithRelations = CategoriaPro & CategoriaProRelations;
