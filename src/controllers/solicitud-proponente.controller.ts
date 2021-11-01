import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Keys} from '../config/Keys';
import {NotificacionCorreo, SolicitudProponente} from '../models';
import {ProponenteTrabajoRepository, SolicitudProponenteRepository, SolicitudRepository} from '../repositories';
import {NotificacionesService} from '../services';

export class SolicitudProponenteController {
  constructor(
    @repository(SolicitudProponenteRepository)
    public solicitudProponenteRepository: SolicitudProponenteRepository,
    @repository(ProponenteTrabajoRepository)
    public proponenteTrabajoRepository: ProponenteTrabajoRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
    @repository(SolicitudRepository)
    public SolicitudRepository: SolicitudRepository
  ) { }

  @post('/solicitud-proponentes')
  @response(200, {
    description: 'SolicitudProponente model instance',
    content: {'application/json': {schema: getModelSchemaRef(SolicitudProponente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudProponente, {
            title: 'NewSolicitudProponente',
            exclude: ['id'],
          }),
        },
      },
    })
    solicitudProponente: Omit<SolicitudProponente, 'id'>,
  ): Promise<SolicitudProponente> {
    let solicitudCreada = await this.solicitudProponenteRepository.create(solicitudProponente);
    const proponenteTrabajo = await this.proponenteTrabajoRepository.findById(solicitudProponente.proponenteTrabajoId);
    const solicitud = await this.SolicitudRepository.findById(solicitudProponente.solicitudId);

    if (solicitudCreada) {
      let datos = new NotificacionCorreo();
      datos.destinatario = proponenteTrabajo.correo;
      datos.asunto = Keys.asuntoSolicitud;
      datos.mensaje = `Hola ${proponenteTrabajo.primerNombre} ${proponenteTrabajo.segundoApellido} su solicitud fue registrada con exito:<br/> Nombre de trabajo: ${solicitud.nombreTrabajo}<br/>fecha de radicacion: ${solicitud.fecha}`;
      this.servicioNotificaciones.EnviarCorreo(datos);
    }
    return solicitudCreada;
  }

  @get('/solicitud-proponentes/count')
  @response(200, {
    description: 'SolicitudProponente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SolicitudProponente) where?: Where<SolicitudProponente>,
  ): Promise<Count> {
    return this.solicitudProponenteRepository.count(where);
  }

  @get('/solicitud-proponentes')
  @response(200, {
    description: 'Array of SolicitudProponente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SolicitudProponente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SolicitudProponente) filter?: Filter<SolicitudProponente>,
  ): Promise<SolicitudProponente[]> {
    return this.solicitudProponenteRepository.find(filter);
  }

  @patch('/solicitud-proponentes')
  @response(200, {
    description: 'SolicitudProponente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudProponente, {partial: true}),
        },
      },
    })
    solicitudProponente: SolicitudProponente,
    @param.where(SolicitudProponente) where?: Where<SolicitudProponente>,
  ): Promise<Count> {
    return this.solicitudProponenteRepository.updateAll(solicitudProponente, where);
  }

  @get('/solicitud-proponentes/{id}')
  @response(200, {
    description: 'SolicitudProponente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SolicitudProponente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SolicitudProponente, {exclude: 'where'}) filter?: FilterExcludingWhere<SolicitudProponente>
  ): Promise<SolicitudProponente> {
    return this.solicitudProponenteRepository.findById(id, filter);
  }

  @patch('/solicitud-proponentes/{id}')
  @response(204, {
    description: 'SolicitudProponente PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudProponente, {partial: true}),
        },
      },
    })
    solicitudProponente: SolicitudProponente,
  ): Promise<void> {
    await this.solicitudProponenteRepository.updateById(id, solicitudProponente);
  }

  @put('/solicitud-proponentes/{id}')
  @response(204, {
    description: 'SolicitudProponente PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() solicitudProponente: SolicitudProponente,
  ): Promise<void> {
    await this.solicitudProponenteRepository.replaceById(id, solicitudProponente);
  }

  @del('/solicitud-proponentes/{id}')
  @response(204, {
    description: 'SolicitudProponente DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.solicitudProponenteRepository.deleteById(id);
  }
}
