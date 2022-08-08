import { Pokemon } from 'src/application/model/pokemon';

export interface FindPokemonPortIn {
  execute(name: string): Promise<Pokemon>;
}
