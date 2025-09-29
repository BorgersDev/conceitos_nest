import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RemindersModule } from './reminders/reminders.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'conceitos-nest',
    autoLoadEntities: true,
    synchronize: true,
  }),RemindersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
