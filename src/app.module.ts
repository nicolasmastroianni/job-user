import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { PokemonController } from "./adapter/controller/pokemon.controller";
import { AppService } from "./app.service";
import { FindPokemonUseCase } from "./application/usecase/find.pokemon.usecase";
import { PokemonRestClient } from "./adapter/rest/pokemon.rest.client";

import { ConfigModule } from "@nestjs/config";
import { PokemonConfigurarion } from "./config/pokemon.configuration";
import { ScheduleModule } from "@nestjs/schedule";
import { UpdateUsersWithoutBillerIdUseCase } from "./application/usecase/update.users.without.billerid.usecase";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserMySqlAdapter } from "./adapter/mysql/user.mysql.adapter";
import { UserScheduleCron } from "./adapter/schedule/user.schedule.cron";
import { UserSoaAdapter } from "./adapter/soa/user.soa.adapter";

@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot(), TypeOrmModule.forRoot({
    type: "mysql",
    host: "192.168.75.20",
    port: 3306,
    username: "spsT_usr",
    password: "veef8Eed",
    database: "dec_onboarding",
    entities: [],
    synchronize: true
  })],
  controllers: [AppController, PokemonController],
  providers: [
    AppService,
    PokemonConfigurarion,
    PokemonRestClient,
    FindPokemonUseCase,
    UpdateUsersWithoutBillerIdUseCase,
    UserMySqlAdapter,
    UserSoaAdapter,
    UserScheduleCron,
    {
      useClass: UserMySqlAdapter,
      provide: "usersToUpdateRepository"
    },
    {
      useClass: UserSoaAdapter,
      provide: "userUpdate"
    },
    {
      useClass: UpdateUsersWithoutBillerIdUseCase,
      provide: "UPDATE_USERS"
    }
  ]
})
export class AppModule {
}
