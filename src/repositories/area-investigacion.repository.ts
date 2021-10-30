import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {AreaInvestigacion, AreaInvestigacionRelations, Solicitud} from '../models';
import {SolicitudRepository} from './solicitud.repository';

export class AreaInvestigacionRepository extends DefaultCrudRepository<
  AreaInvestigacion,
  typeof AreaInvestigacion.prototype.id,
  AreaInvestigacionRelations
> {

  public readonly idSolicitud: HasManyRepositoryFactory<Solicitud, typeof AreaInvestigacion.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(AreaInvestigacion, dataSource);
    this.idSolicitud = this.createHasManyRepositoryFactoryFor('idSolicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('idSolicitud', this.idSolicitud.inclusionResolver);
  }
}
