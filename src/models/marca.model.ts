import {Entity, model, property, hasMany} from '@loopback/repository';
import {Producto} from './producto.model';

@model()
export class Marca extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @hasMany(() => Producto)
  productos: Producto[];

  constructor(data?: Partial<Marca>) {
    super(data);
  }
}

export interface MarcaRelations {
  // describe navigational properties here
}

export type MarcaWithRelations = Marca & MarcaRelations;
