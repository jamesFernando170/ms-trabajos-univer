import {AuthenticationStrategy} from '@loopback/authentication';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {Keys} from '../config/Keys';
const fetch = require('node-fetch');

export class JuradoStrategy implements AuthenticationStrategy {
  name: string = 'jurado';

  constructor(
  ) { }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = parseBearerToken(request);
    if (token) {
      let url = `${Keys.url_validar_token}?${Keys.arg_token}=${token}&${Keys.arg_rol_validar}=${Keys.rol_jurado}`;
      console.log(url)
      let respuesta = "";
      await fetch(url)
        .then(async (res: any) => {
          respuesta = await res.text();
        });
      switch (respuesta) {
        case "OK":
          let perfil: UserProfile = Object.assign({
            admin: "OK"
          });
          return perfil;
          break;
        case "KO":
          throw new HttpErrors[401]("Tiene un token válido, pero el rol no corresponde");
          break;
        case "":
          throw new HttpErrors[401]("El token enviado no es válido");
          break;
      }
    } else {
      throw new HttpErrors[401]("La solicitud no posee un token");
    }
  }


}
