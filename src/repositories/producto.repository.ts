import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Producto, ProductoRelations, Categoria, CategoriaPro, Imagen, Marca} from '../models';
import {CategoriaProRepository} from './categoria-pro.repository';
import {CategoriaRepository} from './categoria.repository';
import {ImagenRepository} from './imagen.repository';
import {MarcaRepository} from './marca.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype._id,
  ProductoRelations
> {

  public readonly categorias: HasManyThroughRepositoryFactory<Categoria, typeof Categoria.prototype._id,
          CategoriaPro,
          typeof Producto.prototype._id
        >;

  public readonly imagens: HasManyRepositoryFactory<Imagen, typeof Producto.prototype._id>;

  public readonly marca: BelongsToAccessor<Marca, typeof Producto.prototype._id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('CategoriaProRepository') protected categoriaProRepositoryGetter: Getter<CategoriaProRepository>, @repository.getter('CategoriaRepository') protected categoriaRepositoryGetter: Getter<CategoriaRepository>, @repository.getter('ImagenRepository') protected imagenRepositoryGetter: Getter<ImagenRepository>, @repository.getter('MarcaRepository') protected marcaRepositoryGetter: Getter<MarcaRepository>,
  ) {
    super(Producto, dataSource);
    this.marca = this.createBelongsToAccessorFor('marca', marcaRepositoryGetter,);
    this.registerInclusionResolver('marca', this.marca.inclusionResolver);
    this.imagens = this.createHasManyRepositoryFactoryFor('imagens', imagenRepositoryGetter,);
    this.registerInclusionResolver('imagens', this.imagens.inclusionResolver);
    this.categorias = this.createHasManyThroughRepositoryFactoryFor('categorias', categoriaRepositoryGetter, categoriaProRepositoryGetter,);
    this.registerInclusionResolver('categorias', this.categorias.inclusionResolver);
  }
}
