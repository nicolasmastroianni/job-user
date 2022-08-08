import { Controller, Get, Param } from '@nestjs/common';
import { FindPokemonUseCase } from 'src/application/usecase/find.pokemon.usecase';
import { PokemonRestModel } from './pokemon.rest.model';

@Controller('/api/v1')
export class PokemonController {
  constructor(private readonly findPokemonUseCase: FindPokemonUseCase) {}

  @Get('/pokemon/:name')
  getPokemon(@Param('name') name: string): Promise<PokemonRestModel> {
    return this.findPokemonUseCase
      .execute(name)
      .then((p) => new PokemonRestModel(p.id, p.name));
  }
}
