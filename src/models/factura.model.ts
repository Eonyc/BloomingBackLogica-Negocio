import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Producto} from './producto.model';
import {FacturaProdu} from './factura-produ.model';
import {Cliente} from './cliente.model';

@model()
export class Factura extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'number',
    required: true,
  })
  consecutivo: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
  })
  hora?: string;

  @hasMany(() => Producto, {through: {model: () => FacturaProdu}})
  productos: Producto[];

  @belongsTo(() => Cliente)
  clienteId: string;

  constructor(data?: Partial<Factura>) {
    super(data);
  }
}

export interface FacturaRelations {
  // describe navigational properties here
}

export type FacturaWithRelations = Factura & FacturaRelations;
