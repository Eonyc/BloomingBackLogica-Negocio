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
  Direccion,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteDireccionController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/direccion', {
    responses: {
      '200': {
        description: 'Cliente has one Direccion',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Direccion),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Direccion>,
  ): Promise<Direccion> {
    return this.clienteRepository.direccion(id).get(filter);
  }

  @post('/clientes/{id}/direccion', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Direccion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Direccion, {
            title: 'NewDireccionInCliente',
            exclude: ['_id'],
            optional: ['clienteId']
          }),
        },
      },
    }) direccion: Omit<Direccion, '_id'>,
  ): Promise<Direccion> {
    return this.clienteRepository.direccion(id).create(direccion);
  }

  @patch('/clientes/{id}/direccion', {
    responses: {
      '200': {
        description: 'Cliente.Direccion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Direccion, {partial: true}),
        },
      },
    })
    direccion: Partial<Direccion>,
    @param.query.object('where', getWhereSchemaFor(Direccion)) where?: Where<Direccion>,
  ): Promise<Count> {
    return this.clienteRepository.direccion(id).patch(direccion, where);
  }

  @del('/clientes/{id}/direccion', {
    responses: {
      '200': {
        description: 'Cliente.Direccion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Direccion)) where?: Where<Direccion>,
  ): Promise<Count> {
    return this.clienteRepository.direccion(id).delete(where);
  }
}
