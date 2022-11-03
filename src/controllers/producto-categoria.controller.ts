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
CategoriaPro,
Categoria,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoCategoriaController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/categorias', {
    responses: {
      '200': {
        description: 'Array of Producto has many Categoria through CategoriaPro',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Categoria)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Categoria>,
  ): Promise<Categoria[]> {
    return this.productoRepository.categorias(id).find(filter);
  }

  @post('/productos/{id}/categorias', {
    responses: {
      '200': {
        description: 'create a Categoria model instance',
        content: {'application/json': {schema: getModelSchemaRef(Categoria)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Producto.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categoria, {
            title: 'NewCategoriaInProducto',
            exclude: ['_id'],
          }),
        },
      },
    }) categoria: Omit<Categoria, '_id'>,
  ): Promise<Categoria> {
    return this.productoRepository.categorias(id).create(categoria);
  }

  @patch('/productos/{id}/categorias', {
    responses: {
      '200': {
        description: 'Producto.Categoria PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categoria, {partial: true}),
        },
      },
    })
    categoria: Partial<Categoria>,
    @param.query.object('where', getWhereSchemaFor(Categoria)) where?: Where<Categoria>,
  ): Promise<Count> {
    return this.productoRepository.categorias(id).patch(categoria, where);
  }

  @del('/productos/{id}/categorias', {
    responses: {
      '200': {
        description: 'Producto.Categoria DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Categoria)) where?: Where<Categoria>,
  ): Promise<Count> {
    return this.productoRepository.categorias(id).delete(where);
  }
}
