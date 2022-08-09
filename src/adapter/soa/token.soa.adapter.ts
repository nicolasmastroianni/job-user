import { Injectable, Logger } from "@nestjs/common";
import { TokenRepository } from "../../application/port/out/token.repository";
import { Token } from "../../application/model/token";

const soapRequest = require('easy-soap-request');
const xml2js = require('xml2js');
//TODO INICIO

const xml = `<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
    <soap12:Body>
      <LoginAccess xmlns="http://sye.org/">
        <user>EXT101</user>
        <passwd>com123</passwd>
        <company>VISA-TEST</company>
      </LoginAccess>
    </soap12:Body>
  </soap12:Envelope>`;

const url = 'http://10.10.10.217/services/services.asmx?wsdl';

const sampleHeaders = {
  'Content-Type': 'text/xml',
};
@Injectable()
export class TokenSoaAdapter implements TokenRepository {

  private readonly logger = new Logger(TokenSoaAdapter.name);
  private readonly USER_ID: string = '';
  private readonly PASSWORD: string = '';
  private readonly COMPANY_ID: string = '';

  async get(): Promise<Token> {
    this.logger.debug(`Obteniendo token para servicio AMY`);

    let { Token } = await Promise.resolve(GetToken());
    //TODO FIN
    this.logger.debug(`Token obtenido ${Token}`);
    return Token;
  }
}

async function GetToken(): Promise<any> {
  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml });
  const { body } = response;

  let logginResponse;
  xml2js.parseString(body, (err, result) => {

    if (err) {
      throw err;
    }
    logginResponse = result['soap:Envelope']['soap:Body']
    [0]['LoginAccessResponse'][0]['LoginAccessResult'][0]
    ['LoginAccessResponse'][0];
  });
  return logginResponse;
}
