import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_solicitudComite_solicitud: {
        name: ' fk_solicitudComite_solicitud',
        entity: 'Solicitud',
        entityKey: 'id',
        foreignKey: 'solicitudId',
      },
      fk_solicitudComite_tiposComite: {
        name: 'fk_solicitudComite_tiposComite',
        entity: 'TiposComite',
        entityKey: 'id',
        foreignKey: 'tiposComiteId',
      },
    },
  },
})
export class SolicitudComite extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  solicitudId?: number;

  @property({
    type: 'number',
  })
  tiposComiteId?: number;

  constructor(data?: Partial<SolicitudComite>) {
    super(data);
  }
}

export interface SolicitudComiteRelations {
  // describe navigational properties here
}

export type SolicitudComiteWithRelations = SolicitudComite & SolicitudComiteRelations;
