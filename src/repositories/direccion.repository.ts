import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Direccion, DireccionRelations} from '../models';

export class DireccionRepository extends DefaultCrudRepository<
  Direccion,
  typeof Direccion.prototype._id,
  DireccionRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Direccion, dataSource);
  }
}
