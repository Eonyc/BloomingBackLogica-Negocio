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
  Producto,
  Imagen,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoImagenController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/imagens', {
    responses: {
      '200': {
        description: 'Array of Producto has many Imagen',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Imagen)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Imagen>,
  ): Promise<Imagen[]> {
    return this.productoRepository.imagens(id).find(filter);
  }

  @post('/productos/{id}/imagens', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Imagen)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Producto.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Imagen, {
            title: 'NewImagenInProducto',
            exclude: ['_id'],
            optional: ['productoId']
          }),
        },
      },
    }) imagen: Omit<Imagen, '_id'>,
  ): Promise<Imagen> {
    return this.productoRepository.imagens(id).create(imagen);
  }

  @patch('/productos/{id}/imagens', {
    responses: {
      '200': {
        description: 'Producto.Imagen PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Imagen, {partial: true}),
        },
      },
    })
    imagen: Partial<Imagen>,
    @param.query.object('where', getWhereSchemaFor(Imagen)) where?: Where<Imagen>,
  ): Promise<Count> {
    return this.productoRepository.imagens(id).patch(imagen, where);
  }

  @del('/productos/{id}/imagens', {
    responses: {
      '200': {
        description: 'Producto.Imagen DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Imagen)) where?: Where<Imagen>,
  ): Promise<Count> {
    return this.productoRepository.imagens(id).delete(where);
  }
}
