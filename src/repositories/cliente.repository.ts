import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Cliente, ClienteRelations, Factura, Direccion, ClienteUsuario} from '../models';
import {FacturaRepository} from './factura.repository';
import {DireccionRepository} from './direccion.repository';
import {ClienteUsuarioRepository} from './cliente-usuario.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype._id,
  ClienteRelations
> {

  public readonly facturas: HasManyRepositoryFactory<Factura, typeof Cliente.prototype._id>;

  public readonly direccion: HasOneRepositoryFactory<Direccion, typeof Cliente.prototype._id>;

  public readonly clienteUsuario: HasOneRepositoryFactory<ClienteUsuario, typeof Cliente.prototype._id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>, @repository.getter('DireccionRepository') protected direccionRepositoryGetter: Getter<DireccionRepository>, @repository.getter('ClienteUsuarioRepository') protected clienteUsuarioRepositoryGetter: Getter<ClienteUsuarioRepository>,
  ) {
    super(Cliente, dataSource);
    this.clienteUsuario = this.createHasOneRepositoryFactoryFor('clienteUsuario', clienteUsuarioRepositoryGetter);
    this.registerInclusionResolver('clienteUsuario', this.clienteUsuario.inclusionResolver);
    this.direccion = this.createHasOneRepositoryFactoryFor('direccion', direccionRepositoryGetter);
    this.registerInclusionResolver('direccion', this.direccion.inclusionResolver);
    this.facturas = this.createHasManyRepositoryFactoryFor('facturas', facturaRepositoryGetter,);
    this.registerInclusionResolver('facturas', this.facturas.inclusionResolver);
  }
}
