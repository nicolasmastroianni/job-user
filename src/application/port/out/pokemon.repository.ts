import { Pokemon } from 'src/application/model/pokemon';

export interface PokemonRepository {
  findPokemonByName(name: string): Promise<Pokemon>;
}
