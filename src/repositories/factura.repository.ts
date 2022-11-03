import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Factura, FacturaRelations, Producto, FacturaProdu, Cliente} from '../models';
import {FacturaProduRepository} from './factura-produ.repository';
import {ProductoRepository} from './producto.repository';
import {ClienteRepository} from './cliente.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype._id,
  FacturaRelations
> {

  public readonly productos: HasManyThroughRepositoryFactory<Producto, typeof Producto.prototype._id,
          FacturaProdu,
          typeof Factura.prototype._id
        >;

  public readonly cliente: BelongsToAccessor<Cliente, typeof Factura.prototype._id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('FacturaProduRepository') protected facturaProduRepositoryGetter: Getter<FacturaProduRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Factura, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.productos = this.createHasManyThroughRepositoryFactoryFor('productos', productoRepositoryGetter, facturaProduRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
  }
}
