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
  Marca,
  Producto,
} from '../models';
import {MarcaRepository} from '../repositories';

export class MarcaProductoController {
  constructor(
    @repository(MarcaRepository) protected marcaRepository: MarcaRepository,
  ) { }

  @get('/marcas/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of Marca has many Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Producto>,
  ): Promise<Producto[]> {
    return this.marcaRepository.productos(id).find(filter);
  }

  @post('/marcas/{id}/productos', {
    responses: {
      '200': {
        description: 'Marca model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Marca.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInMarca',
            exclude: ['_id'],
            optional: ['marcaId']
          }),
        },
      },
    }) producto: Omit<Producto, '_id'>,
  ): Promise<Producto> {
    return this.marcaRepository.productos(id).create(producto);
  }

  @patch('/marcas/{id}/productos', {
    responses: {
      '200': {
        description: 'Marca.Producto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {partial: true}),
        },
      },
    })
    producto: Partial<Producto>,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.marcaRepository.productos(id).patch(producto, where);
  }

  @del('/marcas/{id}/productos', {
    responses: {
      '200': {
        description: 'Marca.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.marcaRepository.productos(id).delete(where);
  }
}
