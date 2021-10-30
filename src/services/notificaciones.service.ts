import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys} from '../config/Keys';
import {NotificacionCorreo} from '../models';
const fetch = require('node-fetch');

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionesService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */
  EnviarCorreo(datos: NotificacionCorreo
  ) {
    let url = `${Keys.urlCorreo}?destino=${datos.destinatario}&asunto=${datos.asunto}&mensaje=${datos.mensaje}&hash=${Keys.hashNotificacion}`;
    fetch(url)
      .then((res: any) => {
        console.log(res.text());
      })
  }
}
