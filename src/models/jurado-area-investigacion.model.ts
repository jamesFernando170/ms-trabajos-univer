import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_juradoAreaInvestigacion_juradoId: {
        name: 'fk_juradoAreaInvestigacion_juradoId',
        entity: 'Jurado',
        entityKey: 'id',
        foreignKey: 'juradoId',
      },
      fk_juradoAreaInvestigacion_areaInvestigacion: {
        name: 'fk_juradoAreaInvestigacion_areaInvestigacion',
        entity: 'AreaInvestigacion',
        entityKey: 'id',
        foreignKey: 'areaInvestigacionId',
      },
    },
  },
})
export class JuradoAreaInvestigacion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  juradoId?: number;

  @property({
    type: 'number',
  })
  areaInvestigacionId?: number;

  constructor(data?: Partial<JuradoAreaInvestigacion>) {
    super(data);
  }
}

export interface JuradoAreaInvestigacionRelations {
  // describe navigational properties here
}

export type JuradoAreaInvestigacionWithRelations = JuradoAreaInvestigacion & JuradoAreaInvestigacionRelations;
