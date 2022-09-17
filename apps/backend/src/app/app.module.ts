import { PairService, SharedModule } from '@crypto-watch/shared';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PairModule } from './pair/pair.module';
import { TickModule } from './tick/tick.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    SharedModule,
    TickModule,
    PairModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
