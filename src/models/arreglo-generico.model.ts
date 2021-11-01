import {Model, model, property} from '@loopback/repository';

@model()
export class ArregloGenerico extends Model {
  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  arregloGenerico: number[];


  constructor(data?: Partial<ArregloGenerico>) {
    super(data);
  }
}

export interface ArregloGenericoRelations {
  // describe navigational properties here
}

export type ArregloGenericoWithRelations = ArregloGenerico & ArregloGenericoRelations;
