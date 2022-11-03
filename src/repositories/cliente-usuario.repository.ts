import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {ClienteUsuario, ClienteUsuarioRelations, Cliente} from '../models';
import {ClienteRepository} from './cliente.repository';

export class ClienteUsuarioRepository extends DefaultCrudRepository<
  ClienteUsuario,
  typeof ClienteUsuario.prototype._id,
  ClienteUsuarioRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof ClienteUsuario.prototype._id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(ClienteUsuario, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
