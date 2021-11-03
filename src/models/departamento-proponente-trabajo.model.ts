import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_departamentoProponente_proponenteId: {
        name: 'fk_departamentoProponente_proponenteId',
        entity: 'ProponenteTrabajo',
        entityKey: 'id',
        foreignKey: 'idProponenteTrabajo',
      },
      fk_departamentoProponente_DepartamentoId: {
        name: 'fk_departamentoProponente_DepartamentoId',
        entity: 'Departamento',
        entityKey: 'id',
        foreignKey: 'idDepartamento',
      },
    },
  },
})
export class DepartamentoProponenteTrabajo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  idProponenteTrabajo?: number;

  @property({
    type: 'number',
  })
  idDepartamento?: number;

  constructor(data?: Partial<DepartamentoProponenteTrabajo>) {
    super(data);
  }
}

export interface DepartamentoProponenteTrabajoRelations {
  // describe navigational properties here
}

export type DepartamentoProponenteTrabajoWithRelations = DepartamentoProponenteTrabajo & DepartamentoProponenteTrabajoRelations;
