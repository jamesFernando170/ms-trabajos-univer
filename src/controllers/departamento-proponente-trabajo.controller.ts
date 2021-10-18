import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {DepartamentoProponenteTrabajo} from '../models';
import {DepartamentoProponenteTrabajoRepository} from '../repositories';

export class DepartamentoProponenteTrabajoController {
  constructor(
    @repository(DepartamentoProponenteTrabajoRepository)
    public departamentoProponenteTrabajoRepository : DepartamentoProponenteTrabajoRepository,
  ) {}

  @post('/departamento-proponente-trabajos')
  @response(200, {
    description: 'DepartamentoProponenteTrabajo model instance',
    content: {'application/json': {schema: getModelSchemaRef(DepartamentoProponenteTrabajo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DepartamentoProponenteTrabajo, {
            title: 'NewDepartamentoProponenteTrabajo',
            exclude: ['id'],
          }),
        },
      },
    })
    departamentoProponenteTrabajo: Omit<DepartamentoProponenteTrabajo, 'id'>,
  ): Promise<DepartamentoProponenteTrabajo> {
    return this.departamentoProponenteTrabajoRepository.create(departamentoProponenteTrabajo);
  }

  @get('/departamento-proponente-trabajos/count')
  @response(200, {
    description: 'DepartamentoProponenteTrabajo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DepartamentoProponenteTrabajo) where?: Where<DepartamentoProponenteTrabajo>,
  ): Promise<Count> {
    return this.departamentoProponenteTrabajoRepository.count(where);
  }

  @get('/departamento-proponente-trabajos')
  @response(200, {
    description: 'Array of DepartamentoProponenteTrabajo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DepartamentoProponenteTrabajo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DepartamentoProponenteTrabajo) filter?: Filter<DepartamentoProponenteTrabajo>,
  ): Promise<DepartamentoProponenteTrabajo[]> {
    return this.departamentoProponenteTrabajoRepository.find(filter);
  }

  @patch('/departamento-proponente-trabajos')
  @response(200, {
    description: 'DepartamentoProponenteTrabajo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DepartamentoProponenteTrabajo, {partial: true}),
        },
      },
    })
    departamentoProponenteTrabajo: DepartamentoProponenteTrabajo,
    @param.where(DepartamentoProponenteTrabajo) where?: Where<DepartamentoProponenteTrabajo>,
  ): Promise<Count> {
    return this.departamentoProponenteTrabajoRepository.updateAll(departamentoProponenteTrabajo, where);
  }

  @get('/departamento-proponente-trabajos/{id}')
  @response(200, {
    description: 'DepartamentoProponenteTrabajo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DepartamentoProponenteTrabajo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(DepartamentoProponenteTrabajo, {exclude: 'where'}) filter?: FilterExcludingWhere<DepartamentoProponenteTrabajo>
  ): Promise<DepartamentoProponenteTrabajo> {
    return this.departamentoProponenteTrabajoRepository.findById(id, filter);
  }

  @patch('/departamento-proponente-trabajos/{id}')
  @response(204, {
    description: 'DepartamentoProponenteTrabajo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DepartamentoProponenteTrabajo, {partial: true}),
        },
      },
    })
    departamentoProponenteTrabajo: DepartamentoProponenteTrabajo,
  ): Promise<void> {
    await this.departamentoProponenteTrabajoRepository.updateById(id, departamentoProponenteTrabajo);
  }

  @put('/departamento-proponente-trabajos/{id}')
  @response(204, {
    description: 'DepartamentoProponenteTrabajo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() departamentoProponenteTrabajo: DepartamentoProponenteTrabajo,
  ): Promise<void> {
    await this.departamentoProponenteTrabajoRepository.replaceById(id, departamentoProponenteTrabajo);
  }

  @del('/departamento-proponente-trabajos/{id}')
  @response(204, {
    description: 'DepartamentoProponenteTrabajo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.departamentoProponenteTrabajoRepository.deleteById(id);
  }
}
