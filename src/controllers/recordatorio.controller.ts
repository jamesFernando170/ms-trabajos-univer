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
import {Recordatorio} from '../models';
import {RecordatorioRepository} from '../repositories';

export class RecordatorioController {
  constructor(
    @repository(RecordatorioRepository)
    public recordatorioRepository : RecordatorioRepository,
  ) {}

  @post('/recordatorios')
  @response(200, {
    description: 'Recordatorio model instance',
    content: {'application/json': {schema: getModelSchemaRef(Recordatorio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recordatorio, {
            title: 'NewRecordatorio',
            exclude: ['id'],
          }),
        },
      },
    })
    recordatorio: Omit<Recordatorio, 'id'>,
  ): Promise<Recordatorio> {
    return this.recordatorioRepository.create(recordatorio);
  }

  @get('/recordatorios/count')
  @response(200, {
    description: 'Recordatorio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Recordatorio) where?: Where<Recordatorio>,
  ): Promise<Count> {
    return this.recordatorioRepository.count(where);
  }

  @get('/recordatorios')
  @response(200, {
    description: 'Array of Recordatorio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Recordatorio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Recordatorio) filter?: Filter<Recordatorio>,
  ): Promise<Recordatorio[]> {
    return this.recordatorioRepository.find(filter);
  }

  @patch('/recordatorios')
  @response(200, {
    description: 'Recordatorio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recordatorio, {partial: true}),
        },
      },
    })
    recordatorio: Recordatorio,
    @param.where(Recordatorio) where?: Where<Recordatorio>,
  ): Promise<Count> {
    return this.recordatorioRepository.updateAll(recordatorio, where);
  }

  @get('/recordatorios/{id}')
  @response(200, {
    description: 'Recordatorio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Recordatorio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Recordatorio, {exclude: 'where'}) filter?: FilterExcludingWhere<Recordatorio>
  ): Promise<Recordatorio> {
    return this.recordatorioRepository.findById(id, filter);
  }

  @patch('/recordatorios/{id}')
  @response(204, {
    description: 'Recordatorio PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recordatorio, {partial: true}),
        },
      },
    })
    recordatorio: Recordatorio,
  ): Promise<void> {
    await this.recordatorioRepository.updateById(id, recordatorio);
  }

  @put('/recordatorios/{id}')
  @response(204, {
    description: 'Recordatorio PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() recordatorio: Recordatorio,
  ): Promise<void> {
    await this.recordatorioRepository.replaceById(id, recordatorio);
  }

  @del('/recordatorios/{id}')
  @response(204, {
    description: 'Recordatorio DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.recordatorioRepository.deleteById(id);
  }
}
