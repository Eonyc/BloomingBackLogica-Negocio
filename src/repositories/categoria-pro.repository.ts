import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {CategoriaPro, CategoriaProRelations} from '../models';

export class CategoriaProRepository extends DefaultCrudRepository<
  CategoriaPro,
  typeof CategoriaPro.prototype._id,
  CategoriaProRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(CategoriaPro, dataSource);
  }
}
