import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys} from '../config/Keys';
import {NotificacionCorreo} from '../models';
const fetch = require('node-fetch');

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionesService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   Este metodo nos sirve para enviar correos, realizandose mediante el uso del microsericio de notificaciones que se encuentra hecho en python, le enviamos la url que se
   encuentra en la carpeta Config/Keys, ahi tenemos algunas variables que podemos volver a reutilizar
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
