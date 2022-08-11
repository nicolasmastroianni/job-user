import { UserRepository } from "../../application/port/out/user.repository";
import { Injectable, Logger } from "@nestjs/common";
import { User } from "../../application/model/user";
import { Token } from "../../application/model/token";

const soapRequest = require('easy-soap-request');
const xml2js = require('xml2js');

//TODO: implementacion sql momentanea por pruebas, hay que implementar SOA
@Injectable()
export class UserSoaAdapter implements UserRepository {

  private readonly logger = new Logger(UserSoaAdapter.name);

  url = 'http://10.10.10.217/services/services.asmx?wsdl';

  sampleHeaders = {
    'Content-Type': 'text/xml',
  };



  async findByBillerId(billerId: string | null): Promise<User[]> {

    throw new Error("Method not allowed")
  }

  update(user: User): Promise<User | any> {
    throw new Error("Method not allowed")
  }

  async create(token: Token, user: User): Promise<User> {
    this.logger.debug(`Creando usuario ${user}`);


    let xml = `<?xml version="1.0" encoding="utf-8"?>
  <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
    <soap12:Body>
      <PutCustomer xmlns="http://sye.org/">
        <_PutCustomerRequest>
          <Token>${token?.value}</Token>
          <XSysCod>1</XSysCod>
          <CustomerRequest>
            <CompanyId>5</CompanyId>
            <CusTaxId>2</CusTaxId>
            <CustomerDescrip>test</CustomerDescrip>
            <CustcategDescrip>test</CustcategDescrip>
            <CustomerStatus>1</CustomerStatus>
            <InvoiceAddressStreet>123</InvoiceAddressStreet>
            <InvoiceAddressCity>123</InvoiceAddressCity>
            <InvoiceAddressState>1</InvoiceAddressState>
            <InvoiceAddressZipcode>1625</InvoiceAddressZipcode>
            <InvoiceAddressCountry>32</InvoiceAddressCountry>
            <TaxcondId>2</TaxcondId>
            <CustomerContacts>
              <CustomerContact xsi:nil="false" />
            </CustomerContacts>
          </CustomerRequest>
        </_PutCustomerRequest>
      </PutCustomer>
    </soap12:Body>
  </soap12:Envelope>
  `;


    //TODO INICIO
    let userResult = await Promise.resolve(undefined);
    //TODO FIN
    this.logger.debug(`Usuario creado ${userResult}`);
    //en este ultimo argumento que usamos en el return del contructor del user iria lo que devuelve el servicio SOA
    // que nosotros consideramos ID Facturador
    return new User(user.id, user.name, user.lastName, null);
  }

}