import {Entity, model, property} from '@loopback/repository';

@model()
export class Direccion extends Entity {
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
  calle: string;

  @property({
    type: 'string',
    required: true,
  })
  numeroD: string;

  @property({
    type: 'string',
  })
  clienteId?: string;

  constructor(data?: Partial<Direccion>) {
    super(data);
  }
}

export interface DireccionRelations {
  // describe navigational properties here
}

export type DireccionWithRelations = Direccion & DireccionRelations;
