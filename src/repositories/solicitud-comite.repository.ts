import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {SolicitudComite, SolicitudComiteRelations} from '../models';

export class SolicitudComiteRepository extends DefaultCrudRepository<
  SolicitudComite,
  typeof SolicitudComite.prototype.id,
  SolicitudComiteRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(SolicitudComite, dataSource);
  }
}
