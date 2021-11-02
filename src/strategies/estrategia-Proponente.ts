import {AuthenticationStrategy} from '@loopback/authentication';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {Keys} from '../config/Keys';
const fetch = require('node-fetch');

export class estrategiaProponente implements AuthenticationStrategy {
  name: string = 'proponente';

  constructor() { }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = parseBearerToken(request);

    if (token) {
      let url = `${Keys.url_validar_token}?${Keys.arg_token}=${token}&${Keys.arg_id_validar}=${Keys.id_proponente}`;
      let respuesta = "";
      await fetch(url)
        .then(async (res: any) => {
          respuesta = await res.text();
        });
      switch (respuesta) {
        case "OK":
          let perfil: UserProfile = Object.assign({
            proponente: " OK"
          });
          return perfil;
        case "KO":
          throw new HttpErrors[401]("Tiene un token valido pero el rol no corresponde")
        case "":
          throw new HttpErrors[401]("eL TOKEN ENVIADO NO ES VALIDO")
      }
    } else {
      throw new HttpErrors[401]("La solicitud no posee un token")
    }
  }
}
