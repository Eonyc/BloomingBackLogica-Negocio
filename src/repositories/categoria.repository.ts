import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Categoria, CategoriaRelations} from '../models';

export class CategoriaRepository extends DefaultCrudRepository<
  Categoria,
  typeof Categoria.prototype._id,
  CategoriaRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Categoria, dataSource);
  }
}
