import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Imagen, ImagenRelations} from '../models';

export class ImagenRepository extends DefaultCrudRepository<
  Imagen,
  typeof Imagen.prototype._id,
  ImagenRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Imagen, dataSource);
  }
}
