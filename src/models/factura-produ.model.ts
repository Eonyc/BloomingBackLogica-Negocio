import {Entity, model, property} from '@loopback/repository';

@model()
export class FacturaProdu extends Entity {
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
  cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  PrecioUnitario: number;

  @property({
    type: 'string',
  })
  facturaId?: string;

  @property({
    type: 'string',
  })
  productoId?: string;

  constructor(data?: Partial<FacturaProdu>) {
    super(data);
  }
}

export interface FacturaProduRelations {
  // describe navigational properties here
}

export type FacturaProduWithRelations = FacturaProdu & FacturaProduRelations;
