import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model()
export class ClienteUsuario extends Entity {
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
  nombreU: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  constructor(data?: Partial<ClienteUsuario>) {
    super(data);
  }
}

export interface ClienteUsuarioRelations {
  // describe navigational properties here
}

export type ClienteUsuarioWithRelations = ClienteUsuario & ClienteUsuarioRelations;
