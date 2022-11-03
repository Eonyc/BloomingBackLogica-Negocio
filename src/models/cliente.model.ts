import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Factura} from './factura.model';
import {Direccion} from './direccion.model';
import {ClienteUsuario} from './cliente-usuario.model';

@model()
export class Cliente extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'number',
    default: 1,
  })
  estado?: number;

  @hasMany(() => Factura)
  facturas: Factura[];

  @hasOne(() => Direccion)
  direccion: Direccion;

  @hasOne(() => ClienteUsuario)
  clienteUsuario: ClienteUsuario;

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
