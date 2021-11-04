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
import {ArregloGenerico, DepartamentoProponenteTrabajo, ProponenteTrabajo} from '../models';
import {DepartamentoProponenteTrabajoRepository} from '../repositories';

/*
Este controlador "DepartamentoProponenteTrabajoController" es el resultado de la relacion de los modelos Departamento y ProponenteTrabajo, donde podremos realizar operaciones
CRUD, donde podremos agregar, actualizar, eliminar, etc, DepartamentoProponenteTrabajo
*/

export class DepartamentoProponenteTrabajoController {
  constructor(
    @repository(DepartamentoProponenteTrabajoRepository)
    public departamentoProponenteTrabajoRepository: DepartamentoProponenteTrabajoRepository,
  ) { }

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

  @post('/departamento-proponente-trabajo', {
    responses: {
      '200': {
        description: 'create a instance of departamento with a proponente',
        content: {'application/json': {schema: getModelSchemaRef(DepartamentoProponenteTrabajo)}},
      },
    },
  })
  async crearRelacion(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DepartamentoProponenteTrabajo, {
            title: 'NewProponenteDepartamento',
            exclude: ['id'],
          }),
        },
      },
    }) datos: Omit<DepartamentoProponenteTrabajo, 'id'>,
  ): Promise<DepartamentoProponenteTrabajo | null> {
    let registro = await this.departamentoProponenteTrabajoRepository.create(datos);
    return registro;
  }

  @post('/asociar-departamento-proponentes-trabajos/{id}', {
    responses: {
      '200': {
        description: 'create a instance of departamento with a proponentes',
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
    @param.path.string('id') idProponenteTrabajo: typeof ProponenteTrabajo.prototype.id
  ): Promise<Boolean> {
    if (datos.arregloGenerico.length > 0) {
      datos.arregloGenerico.forEach(async (idDepartamento: number) => {
        let existe = await this.departamentoProponenteTrabajoRepository.findOne({
          where: {
            idDepartamento: idDepartamento,
            idProponenteTrabajo: idProponenteTrabajo
          }
        })
        if (!existe) {
          this.departamentoProponenteTrabajoRepository.create({
            idDepartamento: idDepartamento,
            idProponenteTrabajo: idProponenteTrabajo
          });
        }

      });
      return true;
    }
    return false;
  }

  @del('/departamento-proponente-trabajo/{id}')
  @response(204, {
    description: 'DepartamentoProponenteTrabajo DELETE success',
  })
  async EliminarRolUsuario(
    @param.path.string('idDepartamento') idDepartamento: number,
    @param.path.string('idProponenteTrabajo') idProponenteTrabajo: number): Promise<Boolean> {
    let reg = await this.departamentoProponenteTrabajoRepository.findOne({
      where: {
        idDepartamento: idDepartamento,
        idProponenteTrabajo: idProponenteTrabajo
      }
    });
    if (reg) {
      await this.departamentoProponenteTrabajoRepository.deleteById(reg.id);
      return true
    }
    return false;
  }
}
