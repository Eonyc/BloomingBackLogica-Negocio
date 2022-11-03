import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ClienteUsuario,
  Cliente,
} from '../models';
import {ClienteUsuarioRepository} from '../repositories';

export class ClienteUsuarioClienteController {
  constructor(
    @repository(ClienteUsuarioRepository)
    public clienteUsuarioRepository: ClienteUsuarioRepository,
  ) { }

  @get('/cliente-usuarios/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to ClienteUsuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof ClienteUsuario.prototype._id,
  ): Promise<Cliente> {
    return this.clienteUsuarioRepository.cliente(id);
  }
}
