import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {JuradoAreaInvestigacion, JuradoAreaInvestigacionRelations} from '../models';

export class JuradoAreaInvestigacionRepository extends DefaultCrudRepository<
  JuradoAreaInvestigacion,
  typeof JuradoAreaInvestigacion.prototype.id,
  JuradoAreaInvestigacionRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(JuradoAreaInvestigacion, dataSource);
  }
}
