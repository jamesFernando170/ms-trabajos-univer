import {Entity, hasMany, model, property} from '@loopback/repository';
import {DepartamentoProponenteTrabajo} from './departamento-proponente-trabajo.model';
import {Departamento} from './departamento.model';
import {SolicitudProponente} from './solicitud-proponente.model';
import {Solicitud} from './solicitud.model';

@model({
  settings: {
    foreignKeys: {
      fk_proponenteTrabajo_tipoVinculacionId: {
        name: 'fk_proponenteTrabajo_tipoVinculacionId',
        entity: 'TipoVinculacion',
        entityKey: 'id',
        foreignKey: 'idTipoVinculacion',
      },
    },
  },
})
export class ProponenteTrabajo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  primerNombre: string;

  @property({
    type: 'string',
    required: true,
  })
  segundoNombre: string;

  @property({
    type: 'string',
    required: true,
  })
  primerApellido: string;

  @property({
    type: 'string',
    required: true,
  })
  segundoApellido: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
  })
  telefono?: string;

  @hasMany(() => Departamento, {through: {model: () => DepartamentoProponenteTrabajo, keyFrom: 'idProponenteTrabajo', keyTo: 'idDepartamento'}})
  departamentos: Departamento[];

  @property({
    type: 'number',
  })
  idTipoVinculacion?: number;

  @hasMany(() => Solicitud, {through: {model: () => SolicitudProponente}})
  solicituds: Solicitud[];

  constructor(data?: Partial<ProponenteTrabajo>) {
    super(data);
  }
}

export interface ProponenteTrabajoRelations {
  // describe navigational properties here
}

export type ProponenteTrabajoWithRelations = ProponenteTrabajo & ProponenteTrabajoRelations;
