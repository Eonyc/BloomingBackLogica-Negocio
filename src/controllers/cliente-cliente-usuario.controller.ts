import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Cliente,
  ClienteUsuario,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteClienteUsuarioController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/cliente-usuario', {
    responses: {
      '200': {
        description: 'Cliente has one ClienteUsuario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ClienteUsuario),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ClienteUsuario>,
  ): Promise<ClienteUsuario> {
    return this.clienteRepository.clienteUsuario(id).get(filter);
  }

  @post('/clientes/{id}/cliente-usuario', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(ClienteUsuario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClienteUsuario, {
            title: 'NewClienteUsuarioInCliente',
            exclude: ['_id'],
            optional: ['clienteId']
          }),
        },
      },
    }) clienteUsuario: Omit<ClienteUsuario, '_id'>,
  ): Promise<ClienteUsuario> {
    return this.clienteRepository.clienteUsuario(id).create(clienteUsuario);
  }

  @patch('/clientes/{id}/cliente-usuario', {
    responses: {
      '200': {
        description: 'Cliente.ClienteUsuario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClienteUsuario, {partial: true}),
        },
      },
    })
    clienteUsuario: Partial<ClienteUsuario>,
    @param.query.object('where', getWhereSchemaFor(ClienteUsuario)) where?: Where<ClienteUsuario>,
  ): Promise<Count> {
    return this.clienteRepository.clienteUsuario(id).patch(clienteUsuario, where);
  }

  @del('/clientes/{id}/cliente-usuario', {
    responses: {
      '200': {
        description: 'Cliente.ClienteUsuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ClienteUsuario)) where?: Where<ClienteUsuario>,
  ): Promise<Count> {
    return this.clienteRepository.clienteUsuario(id).delete(where);
  }
}
