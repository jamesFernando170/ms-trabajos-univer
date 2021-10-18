import {Entity, model, property, hasMany} from '@loopback/repository';
import {TiposComite} from './tipos-comite.model';
import {SolicitudComite} from './solicitud-comite.model';

@model()
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

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
