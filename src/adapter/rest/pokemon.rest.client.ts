import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { Pokemon } from 'src/application/model/pokemon';
import { PokemonRepository } from 'src/application/port/out/pokemon.repository';
import axios from 'axios';
import { PokemonConfigurarion } from 'src/config/pokemon.configuration';

@Injectable()
export class PokemonRestClient implements PokemonRepository {
  constructor(private readonly pokemonConfiguration: PokemonConfigurarion) {}

  findPokemonByName(name: string): Promise<Pokemon> {
    console.log(`Attempt to get url ${this.pokemonConfiguration.url}${name}`);
    return axios
      .get(`${this.pokemonConfiguration.url}${name}`, {
        timeout: this.pokemonConfiguration.timeout,
      })
      .then((response) => new Pokemon(response.data.id, response.data.name))
      .catch((error) => {
        console.log(`Error with call`, error.status);
        if (error.response.status === 404)
          throw new BadRequestException(name, `Pokemon ${name} not found`);
        throw new HttpException('There was an internal error', 500);
      });
  }
}
