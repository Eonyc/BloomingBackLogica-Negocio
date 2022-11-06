/* eslint-disable no-case-declarations */
/* eslint-disable no-empty */
import {AuthenticationStrategy} from '@loopback/authentication'
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security'
import parseBearerToken from 'parse-bearer-token'
import {Keys} from '../config/keys';
const fetch = require('node-fetch');

export class EstretefiasAdmStrategy implements AuthenticationStrategy {
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  name: string = 'admin';

  constructor(

  ) {}

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = parseBearerToken(request);
    if(token){
      let url = `${Keys.urlTokenValido}?${Keys.argToken}=${token}&${Keys.argRolValido}=${Keys.rolAdmin}`
      console.log(url)
      let respuesta = "";
      await fetch(url)
        .then(async (res:any) => {
          respuesta = await res.text();
      });
      switch (respuesta) {
        case "OK":
          // eslint-disable-next-line prefer-const
          let perfil:UserProfile = Object.assign({
            admin: "ok"
          });
          return perfil;

          break;
        case "Ko":
          throw new HttpErrors[401]("Rol no valido")

          break;

        case "":
          throw new HttpErrors[401]("Token no valido");

          break;
      }

    }else{
      throw new HttpErrors[401]("Solicitud rechazada");
    }

  }
}
