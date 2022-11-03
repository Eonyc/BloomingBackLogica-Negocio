import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Marca, MarcaRelations, Producto} from '../models';
import {ProductoRepository} from './producto.repository';

export class MarcaRepository extends DefaultCrudRepository<
  Marca,
  typeof Marca.prototype._id,
  MarcaRelations
> {

  public readonly productos: HasManyRepositoryFactory<Producto, typeof Marca.prototype._id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Marca, dataSource);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
  }
}
