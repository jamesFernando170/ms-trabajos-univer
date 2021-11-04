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
import {TiposComite} from '../models';
import {TiposComiteRepository} from '../repositories';

/*
Este controlador "TiposComiteController" donde podremos realizar operaciones CRUD
*/

export class TiposComiteController {
  constructor(
    @repository(TiposComiteRepository)
    public tiposComiteRepository: TiposComiteRepository,
  ) { }

  @post('/tipos-comites')
  @response(200, {
    description: 'TiposComite model instance',
    content: {'application/json': {schema: getModelSchemaRef(TiposComite)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TiposComite, {
            title: 'NewTiposComite',
            exclude: ['id'],
          }),
        },
      },
    })
    tiposComite: Omit<TiposComite, 'id'>,
  ): Promise<TiposComite> {
    return this.tiposComiteRepository.create(tiposComite);
  }

  @get('/tipos-comites/count')
  @response(200, {
    description: 'TiposComite model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TiposComite) where?: Where<TiposComite>,
  ): Promise<Count> {
    return this.tiposComiteRepository.count(where);
  }

  @get('/tipos-comites')
  @response(200, {
    description: 'Array of TiposComite model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TiposComite, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TiposComite) filter?: Filter<TiposComite>,
  ): Promise<TiposComite[]> {
    return this.tiposComiteRepository.find(filter);
  }

  @patch('/tipos-comites')
  @response(200, {
    description: 'TiposComite PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TiposComite, {partial: true}),
        },
      },
    })
    tiposComite: TiposComite,
    @param.where(TiposComite) where?: Where<TiposComite>,
  ): Promise<Count> {
    return this.tiposComiteRepository.updateAll(tiposComite, where);
  }

  @get('/tipos-comites/{id}')
  @response(200, {
    description: 'TiposComite model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TiposComite, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TiposComite, {exclude: 'where'}) filter?: FilterExcludingWhere<TiposComite>
  ): Promise<TiposComite> {
    return this.tiposComiteRepository.findById(id, filter);
  }

  @patch('/tipos-comites/{id}')
  @response(204, {
    description: 'TiposComite PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TiposComite, {partial: true}),
        },
      },
    })
    tiposComite: TiposComite,
  ): Promise<void> {
    await this.tiposComiteRepository.updateById(id, tiposComite);
  }

  @put('/tipos-comites/{id}')
  @response(204, {
    description: 'TiposComite PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tiposComite: TiposComite,
  ): Promise<void> {
    await this.tiposComiteRepository.replaceById(id, tiposComite);
  }

  @del('/tipos-comites/{id}')
  @response(204, {
    description: 'TiposComite DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tiposComiteRepository.deleteById(id);
  }
}
