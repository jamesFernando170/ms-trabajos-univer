import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, TiposComite, SolicitudComite} from '../models';
import {SolicitudComiteRepository} from './solicitud-comite.repository';
import {TiposComiteRepository} from './tipos-comite.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly tiposComites: HasManyThroughRepositoryFactory<TiposComite, typeof TiposComite.prototype.id,
          SolicitudComite,
          typeof Solicitud.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SolicitudComiteRepository') protected solicitudComiteRepositoryGetter: Getter<SolicitudComiteRepository>, @repository.getter('TiposComiteRepository') protected tiposComiteRepositoryGetter: Getter<TiposComiteRepository>,
  ) {
    super(Solicitud, dataSource);
    this.tiposComites = this.createHasManyThroughRepositoryFactoryFor('tiposComites', tiposComiteRepositoryGetter, solicitudComiteRepositoryGetter,);
    this.registerInclusionResolver('tiposComites', this.tiposComites.inclusionResolver);
  }
}
