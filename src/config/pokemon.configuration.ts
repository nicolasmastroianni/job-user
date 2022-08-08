import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PokemonConfigurarion {

  readonly baseUrl: string;
  readonly url: string;
  readonly timeout: number;

  constructor(private readonly configService: ConfigService) {
    this.baseUrl = configService.get<string>("POKEMON_BASE_URL");
    this.url = `${this.baseUrl}${configService.get<string>("POKEMON_PATH_URL")}`;
    this.timeout = configService.get<number>("POKEMON_TIMEOUT");
  }

}