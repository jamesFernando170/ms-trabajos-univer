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
  requestBody,
  response
} from '@loopback/rest';
import {
  AreaInvestigacion, ArregloGenerico, Jurado, JuradoAreaInvestigacion
} from '../models';
import {JuradoAreaInvestigacionRepository, JuradoRepository} from '../repositories';

/*
Este controlador "JuradoAreaInvestigacionController" es el resultado de la relacion de los modelos Jurado y AreaInvestigacion, donde podremos realizar
operaciones CRUD, donde podremos agregar, actualizar, eliminar, etc, JuradoAreaInvestigacion
*/

export class JuradoAreaInvestigacionController {
  constructor(
    @repository(JuradoRepository) protected juradoRepository: JuradoRepository,
    @repository(JuradoAreaInvestigacionRepository) protected JuradoAreaInvestigacionRepository: JuradoAreaInvestigacionRepository,
  ) { }

  @get('/jurados/{id}/area-investigacions', {
    responses: {
      '200': {
        description: 'Array of Jurado has many AreaInvestigacion through JuradoAreaInvestigacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AreaInvestigacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<AreaInvestigacion>,
  ): Promise<AreaInvestigacion[]> {
    return this.juradoRepository.areaInvestigacions(id).find(filter);
  }

  @post('/jurados/{id}/area-investigacions', {
    responses: {
      '200': {
        description: 'create a AreaInvestigacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(AreaInvestigacion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Jurado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AreaInvestigacion, {
            title: 'NewAreaInvestigacionInJurado',
            exclude: ['id'],
          }),
        },
      },
    }) areaInvestigacion: Omit<AreaInvestigacion, 'id'>,
  ): Promise<AreaInvestigacion> {
    return this.juradoRepository.areaInvestigacions(id).create(areaInvestigacion);
  }

  @patch('/jurados/{id}/area-investigacions', {
    responses: {
      '200': {
        description: 'Jurado.AreaInvestigacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AreaInvestigacion, {partial: true}),
        },
      },
    })
    areaInvestigacion: Partial<AreaInvestigacion>,
    @param.query.object('where', getWhereSchemaFor(AreaInvestigacion)) where?: Where<AreaInvestigacion>,
  ): Promise<Count> {
    return this.juradoRepository.areaInvestigacions(id).patch(areaInvestigacion, where);
  }

  @del('/jurados/{id}/area-investigacions', {
    responses: {
      '200': {
        description: 'Jurado.AreaInvestigacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(AreaInvestigacion)) where?: Where<AreaInvestigacion>,
  ): Promise<Count> {
    return this.juradoRepository.areaInvestigacions(id).delete(where);
  }

  @post('/jurado-area-investigacion', {
    responses: {
      '200': {
        description: 'create a instance of area de investiagación with a jurado',
        content: {'application/json': {schema: getModelSchemaRef(JuradoAreaInvestigacion)}},
      },
    },
  })
  async crearRelacion(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JuradoAreaInvestigacion, {
            title: 'NewAreaInvestigacionJurado',
            exclude: ['id'],
          }),
        },
      },
    }) datos: Omit<JuradoAreaInvestigacion, 'id'>,
  ): Promise<JuradoAreaInvestigacion | null> {
    let registro = await this.JuradoAreaInvestigacionRepository.create(datos);
    return registro;
  }

  @post('/asociar-jurado-areas-investigacion/{id}', {
    responses: {
      '200': {
        description: 'create a instance of area investigación with a jurado',
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
    @param.path.string('id') juradoId: typeof Jurado.prototype.id
  ): Promise<Boolean> {
    if (datos.arregloGenerico.length > 0) {
      datos.arregloGenerico.forEach(async (areaInvestigacionId: number) => {
        let existe = await this.JuradoAreaInvestigacionRepository.findOne({
          where: {
            areaInvestigacionId: areaInvestigacionId,
            juradoId: juradoId
          }
        })
        if (!existe) {
          this.JuradoAreaInvestigacionRepository.create({
            areaInvestigacionId: areaInvestigacionId,
            juradoId: juradoId
          });
        }

      });
      return true;
    }
    return false;
  }

  @del('/jurado-area-investigacion/{id}')
  @response(204, {
    description: 'juradoAreasInvestigacion DELETE success',
  })
  async EliminarRolUsuario(
    @param.path.string('juradoId') juradoId: number,
    @param.path.string('areaInvestigacionId') areaInvestigacionId: number): Promise<Boolean> {
    let reg = await this.JuradoAreaInvestigacionRepository.findOne({
      where: {
        areaInvestigacionId: areaInvestigacionId,
        juradoId: juradoId
      }
    });
    if (reg) {
      await this.JuradoAreaInvestigacionRepository.deleteById(reg.id);
      return true
    }
    return false;
  }
}
