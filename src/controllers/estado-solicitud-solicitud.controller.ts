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
  EstadoSolicitud,
  Solicitud
} from '../models';
import {EstadoSolicitudRepository} from '../repositories';

/*
Este controlador "Estado-solicitudSolicitudController" es el resultado de la relacion de los modelos EstadoSolicitud y Solicitud, donde podremos realizar operaciones
CRUD, donde podremos agregar, actualizar, eliminar, etc, Estado-solicitudSolicitud
*/

export class EstadoSolicitudSolicitudController {
  constructor(
    @repository(EstadoSolicitudRepository) protected estadoSolicitudRepository: EstadoSolicitudRepository,
  ) { }

  @get('/estado-solicituds/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Array of EstadoSolicitud has many Solicitud',
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
    return this.estadoSolicitudRepository.solicituds(id).find(filter);
  }

  @post('/estado-solicituds/{id}/solicituds', {
    responses: {
      '200': {
        description: 'EstadoSolicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof EstadoSolicitud.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitudInEstadoSolicitud',
            exclude: ['id'],
            optional: ['idEstadoSolicitud']
          }),
        },
      },
    }) solicitud: Omit<Solicitud, 'id'>,
  ): Promise<Solicitud> {
    return this.estadoSolicitudRepository.solicituds(id).create(solicitud);
  }

  @patch('/estado-solicituds/{id}/solicituds', {
    responses: {
      '200': {
        description: 'EstadoSolicitud.Solicitud PATCH success count',
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
    return this.estadoSolicitudRepository.solicituds(id).patch(solicitud, where);
  }

  @del('/estado-solicituds/{id}/solicituds', {
    responses: {
      '200': {
        description: 'EstadoSolicitud.Solicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.estadoSolicitudRepository.solicituds(id).delete(where);
  }
}
