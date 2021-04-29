import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import config from '../ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity'
import { ItemsModule } from './items/items.module';


@Module({
  imports: [TypeOrmModule.forRoot(config), TypeOrmModule.forFeature([User]), ItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
