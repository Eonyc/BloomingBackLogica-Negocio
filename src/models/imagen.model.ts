import {Entity, model, property} from '@loopback/repository';

@model()
export class Imagen extends Entity {
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
  name: string;

  @property({
    type: 'string',
  })
  productoId?: string;

  constructor(data?: Partial<Imagen>) {
    super(data);
  }
}

export interface ImagenRelations {
  // describe navigational properties here
}

export type ImagenWithRelations = Imagen & ImagenRelations;
