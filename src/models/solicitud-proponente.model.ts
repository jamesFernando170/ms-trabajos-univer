import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_solicitudProponente_solicitudId: {
        name: 'fk_solicitudProponente_solicitudId',
        entity: 'Solicitud',
        entityKey: 'id',
        foreignKey: 'solicitudId',
      },
      fk_solicitudProponente_proponenteTrabajoId: {
        name: 'fk_solicitudProponente_proponenteTrabajoId',
        entity: 'ProponenteTrabajo',
        entityKey: 'id',
        foreignKey: 'proponenteTrabajoId',
      },
    },
  },
})
export class SolicitudProponente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  proponenteTrabajoId?: number;

  @property({
    type: 'number',
  })
  solicitudId?: number;

  constructor(data?: Partial<SolicitudProponente>) {
    super(data);
  }
}

export interface SolicitudProponenteRelations {
  // describe navigational properties here
}

export type SolicitudProponenteWithRelations = SolicitudProponente & SolicitudProponenteRelations;
