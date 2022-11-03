import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {FacturaProdu, FacturaProduRelations} from '../models';

export class FacturaProduRepository extends DefaultCrudRepository<
  FacturaProdu,
  typeof FacturaProdu.prototype._id,
  FacturaProduRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(FacturaProdu, dataSource);
  }
}
