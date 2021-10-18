import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Jurado, JuradoRelations, AreaInvestigacion, JuradoAreaInvestigacion, Solicitud, InvitacionEvaluar} from '../models';
import {JuradoAreaInvestigacionRepository} from './jurado-area-investigacion.repository';
import {AreaInvestigacionRepository} from './area-investigacion.repository';
import {InvitacionEvaluarRepository} from './invitacion-evaluar.repository';
import {SolicitudRepository} from './solicitud.repository';

export class JuradoRepository extends DefaultCrudRepository<
  Jurado,
  typeof Jurado.prototype.id,
  JuradoRelations
> {

  public readonly areaInvestigacions: HasManyThroughRepositoryFactory<AreaInvestigacion, typeof AreaInvestigacion.prototype.id,
          JuradoAreaInvestigacion,
          typeof Jurado.prototype.id
        >;

  public readonly solicituds: HasManyThroughRepositoryFactory<Solicitud, typeof Solicitud.prototype.id,
          InvitacionEvaluar,
          typeof Jurado.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('JuradoAreaInvestigacionRepository') protected juradoAreaInvestigacionRepositoryGetter: Getter<JuradoAreaInvestigacionRepository>, @repository.getter('AreaInvestigacionRepository') protected areaInvestigacionRepositoryGetter: Getter<AreaInvestigacionRepository>, @repository.getter('InvitacionEvaluarRepository') protected invitacionEvaluarRepositoryGetter: Getter<InvitacionEvaluarRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Jurado, dataSource);
    this.solicituds = this.createHasManyThroughRepositoryFactoryFor('solicituds', solicitudRepositoryGetter, invitacionEvaluarRepositoryGetter,);
    this.registerInclusionResolver('solicituds', this.solicituds.inclusionResolver);
    this.areaInvestigacions = this.createHasManyThroughRepositoryFactoryFor('areaInvestigacions', areaInvestigacionRepositoryGetter, juradoAreaInvestigacionRepositoryGetter,);
    this.registerInclusionResolver('areaInvestigacions', this.areaInvestigacions.inclusionResolver);
  }
}
