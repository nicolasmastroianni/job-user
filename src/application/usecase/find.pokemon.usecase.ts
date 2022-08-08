import { Injectable } from '@nestjs/common';
import { PokemonRestClient } from 'src/adapter/rest/pokemon.rest.client';
import { Pokemon } from '../model/pokemon';
import { FindPokemonPortIn } from '../port/in/find.pokemon.port.in';

@Injectable()
export class FindPokemonUseCase implements FindPokemonPortIn {
  constructor(private readonly pokemonRepository: PokemonRestClient) {}

  execute(name: string): Promise<Pokemon> {
    return this.pokemonRepository.findPokemonByName(name);
  }
}
