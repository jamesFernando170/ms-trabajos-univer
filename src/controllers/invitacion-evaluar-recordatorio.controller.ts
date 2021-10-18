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
  InvitacionEvaluar,
  Recordatorio,
} from '../models';
import {InvitacionEvaluarRepository} from '../repositories';

export class InvitacionEvaluarRecordatorioController {
  constructor(
    @repository(InvitacionEvaluarRepository) protected invitacionEvaluarRepository: InvitacionEvaluarRepository,
  ) { }

  @get('/invitacion-evaluars/{id}/recordatorios', {
    responses: {
      '200': {
        description: 'Array of InvitacionEvaluar has many Recordatorio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Recordatorio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Recordatorio>,
  ): Promise<Recordatorio[]> {
    return this.invitacionEvaluarRepository.recordatorios(id).find(filter);
  }

  @post('/invitacion-evaluars/{id}/recordatorios', {
    responses: {
      '200': {
        description: 'InvitacionEvaluar model instance',
        content: {'application/json': {schema: getModelSchemaRef(Recordatorio)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof InvitacionEvaluar.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recordatorio, {
            title: 'NewRecordatorioInInvitacionEvaluar',
            exclude: ['id'],
            optional: ['idInvitacionEvaluar']
          }),
        },
      },
    }) recordatorio: Omit<Recordatorio, 'id'>,
  ): Promise<Recordatorio> {
    return this.invitacionEvaluarRepository.recordatorios(id).create(recordatorio);
  }

  @patch('/invitacion-evaluars/{id}/recordatorios', {
    responses: {
      '200': {
        description: 'InvitacionEvaluar.Recordatorio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recordatorio, {partial: true}),
        },
      },
    })
    recordatorio: Partial<Recordatorio>,
    @param.query.object('where', getWhereSchemaFor(Recordatorio)) where?: Where<Recordatorio>,
  ): Promise<Count> {
    return this.invitacionEvaluarRepository.recordatorios(id).patch(recordatorio, where);
  }

  @del('/invitacion-evaluars/{id}/recordatorios', {
    responses: {
      '200': {
        description: 'InvitacionEvaluar.Recordatorio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Recordatorio)) where?: Where<Recordatorio>,
  ): Promise<Count> {
    return this.invitacionEvaluarRepository.recordatorios(id).delete(where);
  }
}
