import {Entity, hasMany, model, property} from '@loopback/repository';
import {SolicitudComite} from './solicitud-comite.model';
import {TiposComite} from './tipos-comite.model';

@model({
  settings: {
    foreignKeys: {
      fk_solicitud_tipoSolicitud: {
        name: 'fk_solicitud_tipoSolicitud',
        entity: 'TipoSolicitud',
        entityKey: 'id',
        foreignKey: 'idTipoSolicitud',
      },
      fk_solicitud_estadoSolicitudId: {
        name: 'fk_solicitud_estadoSolicitudId',
        entity: 'EstadoSolicitud',
        entityKey: 'id',
        foreignKey: 'idEstadoSolicitud',
      },
      fk_solicitud_modalidadId: {
        name: 'fk_solicitud_modalidadId',
        entity: 'Modalidad',
        entityKey: 'id',
        foreignKey: 'idModalidad',
      },
      fk_solicitud_areaInvestigacionId: {
        name: 'fk_solicitud_areaInvestigacionId',
        entity: 'AreaInvestigacion',
        entityKey: 'id',
        foreignKey: 'idAreaInvestigacion',
      },
    },
  },
})
export class Solicitud extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreTrabajo: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
  })
  idTipoSolicitud?: number;

  @property({
    type: 'number',
  })
  idEstadoSolicitud?: number;

  @hasMany(() => TiposComite, {through: {model: () => SolicitudComite}})
  tiposComites: TiposComite[];

  @property({
    type: 'number',
  })
  idModalidad?: number;

  @property({
    type: 'number',
  })
  idAreaInvestigacion?: number;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
