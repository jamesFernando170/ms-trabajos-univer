import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Departamento, Facultad
} from '../models';
import {FacultadRepository} from '../repositories';

/*
Este controlador "FacultadDepartamentoController" es el resultado de la relacion de los modelos Facultad y Departamento, donde podremos realizar operaciones
CRUD, donde podremos agregar, actualizar, eliminar, etc, FacultadDepartamento
*/

export class FacultadDepartamentoController {
  constructor(
    @repository(FacultadRepository) protected facultadRepository: FacultadRepository,
  ) { }

  @get('/facultads/{id}/departamentos', {
    responses: {
      '200': {
        description: 'Array of Facultad has many Departamento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Departamento)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Departamento>,
  ): Promise<Departamento[]> {
    return this.facultadRepository.departamentos(id).find(filter);
  }

  @post('/facultads/{id}/departamentos', {
    responses: {
      '200': {
        description: 'Facultad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Departamento)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Facultad.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departamento, {
            title: 'NewDepartamentoInFacultad',
            exclude: ['id'],
            optional: ['idFacultad']
          }),
        },
      },
    }) departamento: Omit<Departamento, 'id'>,
  ): Promise<Departamento> {
    return this.facultadRepository.departamentos(id).create(departamento);
  }

  @patch('/facultads/{id}/departamentos', {
    responses: {
      '200': {
        description: 'Facultad.Departamento PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departamento, {partial: true}),
        },
      },
    })
    departamento: Partial<Departamento>,
    @param.query.object('where', getWhereSchemaFor(Departamento)) where?: Where<Departamento>,
  ): Promise<Count> {
    return this.facultadRepository.departamentos(id).patch(departamento, where);
  }

  @del('/facultads/{id}/departamentos', {
    responses: {
      '200': {
        description: 'Facultad.Departamento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Departamento)) where?: Where<Departamento>,
  ): Promise<Count> {
    return this.facultadRepository.departamentos(id).delete(where);
  }
}
