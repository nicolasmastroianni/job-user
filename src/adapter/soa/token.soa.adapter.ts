import { Injectable, Logger } from "@nestjs/common";
import { TokenRepository } from "../../application/port/out/token.repository";
import { Token } from "../../application/model/token";

@Injectable()
export class TokenSoaAdapter implements TokenRepository {

  private readonly logger = new Logger(TokenSoaAdapter.name);
  private readonly USER_ID : string = '';
  private readonly PASSWORD : string = '';
  private readonly COMPANY_ID : string = '';

  async get(): Promise<Token> {
    this.logger.debug(`Obteniendo token para servicio AMY`);
    //TODO INICIO
    let {Token} = await Promise.resolve(undefined);
    //TODO FIN
    let token : Token = new Token(Token)

    this.logger.debug(`Token obtenido`);
    return token;
  }
}