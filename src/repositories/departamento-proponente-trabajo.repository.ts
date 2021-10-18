import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {DepartamentoProponenteTrabajo, DepartamentoProponenteTrabajoRelations} from '../models';

export class DepartamentoProponenteTrabajoRepository extends DefaultCrudRepository<
  DepartamentoProponenteTrabajo,
  typeof DepartamentoProponenteTrabajo.prototype.id,
  DepartamentoProponenteTrabajoRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(DepartamentoProponenteTrabajo, dataSource);
  }
}
