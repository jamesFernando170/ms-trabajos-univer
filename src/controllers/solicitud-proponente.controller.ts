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
import {ArregloGenerico, NotificacionCorreo, Solicitud, SolicitudProponente} from '../models';
import {ProponenteTrabajoRepository, SolicitudProponenteRepository, SolicitudRepository} from '../repositories';
import {NotificacionesService} from '../services';

/*
Este controlador "SolicitudProponeneteController" es el resultado de la relacion de los modelos Solicitud y Proponente, donde podremos realizar
operaciones CRUD, donde podremos agregar, actualizar, eliminar, etc, Proponente-trabajo-departamento
*/

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

  /*
  En el momento en que un Proponente va a registrar una solicitud, a este se le enviara un correo electronico diciendole que su solicitud acaba de ser registrada y haciendole
  un resumen de dicha solicitud, todo esto mediante el microservicio de notificaciones
  */
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
    /*
    Importamos los repositorios tanto de proponenteTrabajo como de solicitud, para asi filtrarlos por ID y obtener respectivamente su informacion basica y poder acceder a cada uno
    de ellas, sirviendonos para enviarle un resumen de que la solicitud fue registrada al proponente que registro una solicitud y posteriormente, a traves del microservicio de notificaciones
    le enviamos un mensaje
    */
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

  @post('/solicitud-proponente-trabajo', {
    responses: {
      '200': {
        description: 'create a instance of solicitud with a proponente',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudProponente)}},
      },
    },
  })
  async crearRelacion(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudProponente, {
            title: 'NewSolicitudProponente',
            exclude: ['id'],
          }),
        },
      },
    }) datos: Omit<SolicitudProponente, 'id'>,
  ): Promise<SolicitudProponente | null> {
    let registro = await this.solicitudProponenteRepository.create(datos);
    return registro;
  }

  @post('/asociar-solicitud-proponentes-trabajos/{id}', {
    responses: {
      '200': {
        description: 'create a instance of solicitud with a proponentes',
        content: {'application/json': {schema: getModelSchemaRef(ArregloGenerico)}},
      },
    },
  })
  async crearRelaciones(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ArregloGenerico, {}),
        },
      },
    }) datos: ArregloGenerico,
    @param.path.string('id') solicitudId: typeof Solicitud.prototype.id
  ): Promise<Boolean> {
    if (datos.arregloGenerico.length > 0) {
      datos.arregloGenerico.forEach(async (proponenteTrabajoId: number) => {
        let existe = await this.solicitudProponenteRepository.findOne({
          where: {
            proponenteTrabajoId: proponenteTrabajoId,
            solicitudId: solicitudId
          }
        })
        if (!existe) {
          this.solicitudProponenteRepository.create({
            proponenteTrabajoId: proponenteTrabajoId,
            solicitudId: solicitudId
          });
        }

      });
      return true;
    }
    return false;
  }

  @del('/solicitid-proponente-trabajo/{id}')
  @response(204, {
    description: 'SolicitudProponenteTrabajo DELETE success',
  })
  async EliminarRolUsuario(
    @param.path.string('solicitudId') solicitudId: number,
    @param.path.string('proponenteTrabajoId') proponenteTrabajoId: number): Promise<Boolean> {
    let reg = await this.solicitudProponenteRepository.findOne({
      where: {
        proponenteTrabajoId: proponenteTrabajoId,
        solicitudId: solicitudId
      }
    });
    if (reg) {
      await this.solicitudProponenteRepository.deleteById(reg.id);
      return true
    }
    return false;
  }
}
