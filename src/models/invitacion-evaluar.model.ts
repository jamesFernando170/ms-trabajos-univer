import {Entity, hasMany, model, property} from '@loopback/repository';
import {Recordatorio} from './recordatorio.model';
import {ResultadoEvaluacion} from './resultado-evaluacion.model';

@model({
  settings: {
    foreignKeys: {
      fk_invitacionEvaluar_juradoId: {
        name: 'fk_invitacionEvaluar_juradoId',
        entity: 'Jurado',
        entityKey: 'id',
        foreignKey: 'idJurado',
      },
      fk_invitacionEvaluar_solicitudId: {
        name: 'fk_invitacionEvaluar_solicitudId',
        entity: 'Solicitud',
        entityKey: 'id',
        foreignKey: 'idSolicitud',
      },
    },
  },
})
export class InvitacionEvaluar extends Entity {
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
  fechaRespuesta: Date;

  @property({
    type: 'date',
    required: true,
  })
  fechaInvitacion: Date;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoInvitacion: string;

  @property({
    type: 'number',
  })
  idJurado?: number;

  @property({
    type: 'number',
  })
  idSolicitud?: number;

  @hasMany(() => Recordatorio, {keyTo: 'idInvitacionEvaluar'})
  recordatorios: Recordatorio[];

  @hasMany(() => ResultadoEvaluacion, {keyTo: 'idInvitacionEvaluar'})
  resultadoEvaluacions: ResultadoEvaluacion[];

  constructor(data?: Partial<InvitacionEvaluar>) {
    super(data);
  }
}

export interface InvitacionEvaluarRelations {
  // describe navigational properties here
}

export type InvitacionEvaluarWithRelations = InvitacionEvaluar & InvitacionEvaluarRelations;
