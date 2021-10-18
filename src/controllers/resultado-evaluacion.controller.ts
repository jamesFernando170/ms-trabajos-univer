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
import {ResultadoEvaluacion} from '../models';
import {ResultadoEvaluacionRepository} from '../repositories';

export class ResultadoEvaluacionController {
  constructor(
    @repository(ResultadoEvaluacionRepository)
    public resultadoEvaluacionRepository : ResultadoEvaluacionRepository,
  ) {}

  @post('/resultado-evaluacions')
  @response(200, {
    description: 'ResultadoEvaluacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(ResultadoEvaluacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResultadoEvaluacion, {
            title: 'NewResultadoEvaluacion',
            exclude: ['id'],
          }),
        },
      },
    })
    resultadoEvaluacion: Omit<ResultadoEvaluacion, 'id'>,
  ): Promise<ResultadoEvaluacion> {
    return this.resultadoEvaluacionRepository.create(resultadoEvaluacion);
  }

  @get('/resultado-evaluacions/count')
  @response(200, {
    description: 'ResultadoEvaluacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ResultadoEvaluacion) where?: Where<ResultadoEvaluacion>,
  ): Promise<Count> {
    return this.resultadoEvaluacionRepository.count(where);
  }

  @get('/resultado-evaluacions')
  @response(200, {
    description: 'Array of ResultadoEvaluacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ResultadoEvaluacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ResultadoEvaluacion) filter?: Filter<ResultadoEvaluacion>,
  ): Promise<ResultadoEvaluacion[]> {
    return this.resultadoEvaluacionRepository.find(filter);
  }

  @patch('/resultado-evaluacions')
  @response(200, {
    description: 'ResultadoEvaluacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResultadoEvaluacion, {partial: true}),
        },
      },
    })
    resultadoEvaluacion: ResultadoEvaluacion,
    @param.where(ResultadoEvaluacion) where?: Where<ResultadoEvaluacion>,
  ): Promise<Count> {
    return this.resultadoEvaluacionRepository.updateAll(resultadoEvaluacion, where);
  }

  @get('/resultado-evaluacions/{id}')
  @response(200, {
    description: 'ResultadoEvaluacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ResultadoEvaluacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ResultadoEvaluacion, {exclude: 'where'}) filter?: FilterExcludingWhere<ResultadoEvaluacion>
  ): Promise<ResultadoEvaluacion> {
    return this.resultadoEvaluacionRepository.findById(id, filter);
  }

  @patch('/resultado-evaluacions/{id}')
  @response(204, {
    description: 'ResultadoEvaluacion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResultadoEvaluacion, {partial: true}),
        },
      },
    })
    resultadoEvaluacion: ResultadoEvaluacion,
  ): Promise<void> {
    await this.resultadoEvaluacionRepository.updateById(id, resultadoEvaluacion);
  }

  @put('/resultado-evaluacions/{id}')
  @response(204, {
    description: 'ResultadoEvaluacion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() resultadoEvaluacion: ResultadoEvaluacion,
  ): Promise<void> {
    await this.resultadoEvaluacionRepository.replaceById(id, resultadoEvaluacion);
  }

  @del('/resultado-evaluacions/{id}')
  @response(204, {
    description: 'ResultadoEvaluacion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.resultadoEvaluacionRepository.deleteById(id);
  }
}
