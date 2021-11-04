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
import {InvitacionEvaluar, NotificacionCorreo} from '../models';
import {InvitacionEvaluarRepository, JuradoRepository, SolicitudRepository} from '../repositories';
import {NotificacionesService} from '../services';

/*
Este controlador "Invitacion-Evaluar-Controller" es el resultado de la relacion de los modelos Jurado y Solicitud, donde podremos realizar operaciones CRUD, donde
podremos agregar, actualizar, eliminar, etc, Invitacion-Evaluar-ResultadoEvaluacion.
*/

export class InvitacionEvaluarController {
  constructor(
    @repository(InvitacionEvaluarRepository)
    public invitacionEvaluarRepository: InvitacionEvaluarRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
    @repository(JuradoRepository)
    public JuradoRepository: JuradoRepository,
    @repository(SolicitudRepository)
    public SolicitudRepository: SolicitudRepository,
  ) { }

  /*
  En el momento de asignarle una solicitud a uno o varios jurados, se le va a enviar un correo electronico mediante el microservicio de notificaciones donde
  se le informara o se le invitara a revisar una o varias solicitudes
  */
  @post('/invitacion-evaluars')
  @response(200, {
    description: 'InvitacionEvaluar model instance',
    content: {'application/json': {schema: getModelSchemaRef(InvitacionEvaluar)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InvitacionEvaluar, {
            title: 'NewInvitacionEvaluar',
            exclude: ['id'],
          }),
        },
      },
    })
    invitacionEvaluar: Omit<InvitacionEvaluar, 'id'>,
  ): Promise<InvitacionEvaluar> {
    /*
    Importamos los repositorios tanto de jurado como de solicitud, para asi filtrarlos por ID y obtener respectivamente su informacion basica y poder acceder a cada uno
    de ellas, sirviendonos para enviarle la informacion de la solicitud al Jurado que se le asigno dicha solicitud y posteriormente, a traves del microservicio de notificaciones
    le enviamos un mensaje al jurado mediante el correo que le corresponde
    */
    let jurado = await this.JuradoRepository.findById(invitacionEvaluar.idJurado);
    let solicitud = await this.SolicitudRepository.findById(invitacionEvaluar.idSolicitud);
    let invitacionEvaluarCreada = await this.invitacionEvaluarRepository.create(invitacionEvaluar);

    if (invitacionEvaluarCreada) {
      let datos = new NotificacionCorreo();
      datos.destinatario = jurado.correo;
      datos.asunto = Keys.asuntoInvitacionEvaluar;
      datos.mensaje = `Hola ${jurado.nombre} fue invitado a evaluar esta solicitud:</br>Nombre Solicitud ${solicitud.nombreTrabajo}</br>Fecha de radicacion:${solicitud.fecha}</br>Descripcion:${solicitud.descripcion}`;
      this.servicioNotificaciones.EnviarCorreo(datos);
    }
    return invitacionEvaluarCreada;
  }

  @get('/invitacion-evaluars/count')
  @response(200, {
    description: 'InvitacionEvaluar model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(InvitacionEvaluar) where?: Where<InvitacionEvaluar>,
  ): Promise<Count> {
    return this.invitacionEvaluarRepository.count(where);
  }

  @get('/invitacion-evaluars')
  @response(200, {
    description: 'Array of InvitacionEvaluar model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(InvitacionEvaluar, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(InvitacionEvaluar) filter?: Filter<InvitacionEvaluar>,
  ): Promise<InvitacionEvaluar[]> {
    return this.invitacionEvaluarRepository.find(filter);
  }

  @patch('/invitacion-evaluars')
  @response(200, {
    description: 'InvitacionEvaluar PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InvitacionEvaluar, {partial: true}),
        },
      },
    })
    invitacionEvaluar: InvitacionEvaluar,
    @param.where(InvitacionEvaluar) where?: Where<InvitacionEvaluar>,
  ): Promise<Count> {
    return this.invitacionEvaluarRepository.updateAll(invitacionEvaluar, where);
  }

  @get('/invitacion-evaluars/{id}')
  @response(200, {
    description: 'InvitacionEvaluar model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(InvitacionEvaluar, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(InvitacionEvaluar, {exclude: 'where'}) filter?: FilterExcludingWhere<InvitacionEvaluar>
  ): Promise<InvitacionEvaluar> {
    return this.invitacionEvaluarRepository.findById(id, filter);
  }

  @patch('/invitacion-evaluars/{id}')
  @response(204, {
    description: 'InvitacionEvaluar PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InvitacionEvaluar, {partial: true}),
        },
      },
    })
    invitacionEvaluar: InvitacionEvaluar,
  ): Promise<void> {
    await this.invitacionEvaluarRepository.updateById(id, invitacionEvaluar);
  }

  @put('/invitacion-evaluars/{id}')
  @response(204, {
    description: 'InvitacionEvaluar PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() invitacionEvaluar: InvitacionEvaluar,
  ): Promise<void> {
    await this.invitacionEvaluarRepository.replaceById(id, invitacionEvaluar);
  }

  @del('/invitacion-evaluars/{id}')
  @response(204, {
    description: 'InvitacionEvaluar DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.invitacionEvaluarRepository.deleteById(id);
  }
}
