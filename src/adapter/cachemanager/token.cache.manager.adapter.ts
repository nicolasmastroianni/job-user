import { CACHE_MANAGER, Inject, Injectable, Logger } from "@nestjs/common";
import { TokenRepository } from "../../application/port/out/token.repository";
import { Token } from "../../application/model/token";
import { Cache } from "cache-manager";

@Injectable()
export class TokenCacheManagerAdapter implements TokenRepository {

  private readonly logger = new Logger(TokenCacheManagerAdapter.name);
  private KEY = "soa-token";

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
  }

  async get(): Promise<Token> {
    this.logger.debug(`Obteniendo token en cache`);

    await this.cacheManager.get(this.KEY)
      .then((t : string) => {
        this.logger.debug(`El token obtenido es : ${t}`)
        return new Token(t);
      });
    return null;
  }

  async save(token: Token): Promise<Token> {
    this.logger.debug(`Guardando token en cache`);
    await this.cacheManager.set(this.KEY, token.value, { ttl: 39600 })
      .then(() => this.logger.debug(`Token guardado`));
    return token;
  }
}