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
  AreaInvestigacion,
  Solicitud,
} from '../models';
import {AreaInvestigacionRepository} from '../repositories';

export class AreaInvestigacionSolicitudController {
  constructor(
    @repository(AreaInvestigacionRepository) protected areaInvestigacionRepository: AreaInvestigacionRepository,
  ) { }

  @get('/area-investigacions/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Array of AreaInvestigacion has many Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Solicitud>,
  ): Promise<Solicitud[]> {
    return this.areaInvestigacionRepository.idSolicitud(id).find(filter);
  }

  @post('/area-investigacions/{id}/solicituds', {
    responses: {
      '200': {
        description: 'AreaInvestigacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof AreaInvestigacion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitudInAreaInvestigacion',
            exclude: ['id'],
            optional: ['idAreaInvestigacion']
          }),
        },
      },
    }) solicitud: Omit<Solicitud, 'id'>,
  ): Promise<Solicitud> {
    return this.areaInvestigacionRepository.idSolicitud(id).create(solicitud);
  }

  @patch('/area-investigacions/{id}/solicituds', {
    responses: {
      '200': {
        description: 'AreaInvestigacion.Solicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {partial: true}),
        },
      },
    })
    solicitud: Partial<Solicitud>,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.areaInvestigacionRepository.idSolicitud(id).patch(solicitud, where);
  }

  @del('/area-investigacions/{id}/solicituds', {
    responses: {
      '200': {
        description: 'AreaInvestigacion.Solicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.areaInvestigacionRepository.idSolicitud(id).delete(where);
  }
}
