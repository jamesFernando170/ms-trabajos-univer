import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
ProponenteTrabajo,
DepartamentoProponenteTrabajo,
Departamento,
} from '../models';
import {ProponenteTrabajoRepository} from '../repositories';

export class ProponenteTrabajoDepartamentoController {
  constructor(
    @repository(ProponenteTrabajoRepository) protected proponenteTrabajoRepository: ProponenteTrabajoRepository,
  ) { }

  @get('/proponente-trabajos/{id}/departamentos', {
    responses: {
      '200': {
        description: 'Array of ProponenteTrabajo has many Departamento through DepartamentoProponenteTrabajo',
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
    return this.proponenteTrabajoRepository.departamentos(id).find(filter);
  }

  @post('/proponente-trabajos/{id}/departamentos', {
    responses: {
      '200': {
        description: 'create a Departamento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Departamento)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ProponenteTrabajo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departamento, {
            title: 'NewDepartamentoInProponenteTrabajo',
            exclude: ['id'],
          }),
        },
      },
    }) departamento: Omit<Departamento, 'id'>,
  ): Promise<Departamento> {
    return this.proponenteTrabajoRepository.departamentos(id).create(departamento);
  }

  @patch('/proponente-trabajos/{id}/departamentos', {
    responses: {
      '200': {
        description: 'ProponenteTrabajo.Departamento PATCH success count',
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
    return this.proponenteTrabajoRepository.departamentos(id).patch(departamento, where);
  }

  @del('/proponente-trabajos/{id}/departamentos', {
    responses: {
      '200': {
        description: 'ProponenteTrabajo.Departamento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Departamento)) where?: Where<Departamento>,
  ): Promise<Count> {
    return this.proponenteTrabajoRepository.departamentos(id).delete(where);
  }
}
