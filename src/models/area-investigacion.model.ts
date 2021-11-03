import {Entity, hasMany, model, property} from '@loopback/repository';
import {Solicitud} from './solicitud.model';

@model({
  settings: {
    foreignKeys: {
      fk_areaInvestigacion_juradoId: {
        name: 'fk_areaInvestigacion_juradoId',
        entity: 'Jurado',
        entityKey: 'id',
        foreignKey: 'idJurado',
      }
    },
  },
})
export class AreaInvestigacion extends Entity {
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
  nombre: string;

  @property({
    type: 'number',
  })
  idJurado?: number;

  @hasMany(() => Solicitud, {keyTo: 'idAreaInvestigacion'})
  idSolicitud: Solicitud[];

  constructor(data?: Partial<AreaInvestigacion>) {
    super(data);
  }
}

export interface AreaInvestigacionRelations {
  // describe navigational properties here
}

export type AreaInvestigacionWithRelations = AreaInvestigacion & AreaInvestigacionRelations;
