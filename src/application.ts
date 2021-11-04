import {AuthenticationComponent, registerAuthenticationStrategy} from '@loopback/authentication';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {AuxiliarStrategy} from './strategies/Auxiliar';
import {DirectorStrategy} from './strategies/Director';
import {AdministratorStrategy} from './strategies/estrategia-administrador';
import {estrategiaProponente} from './strategies/estrategia-Proponente';
import {JuradoStrategy} from './strategies/Jurado';

export {ApplicationConfig};

export class App extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
    //Antes de agregar las estrategias, debo primero registrarlas antes de definir el componente
    registerAuthenticationStrategy(this, estrategiaProponente);
    registerAuthenticationStrategy(this, AdministratorStrategy);
    registerAuthenticationStrategy(this, AuxiliarStrategy);
    registerAuthenticationStrategy(this, DirectorStrategy);
    registerAuthenticationStrategy(this, JuradoStrategy);
    this.component(AuthenticationComponent);
  }
}
