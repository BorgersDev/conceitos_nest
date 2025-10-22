import { Module } from '@nestjs/common';
import { RemindersController } from './reminders.controller';
import { RemindersService } from './reminders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reminder } from './entities/reminder.entity';
import { PeopleModule } from 'src/people/people.module';

@Module({
  imports: [ TypeOrmModule.forFeature([Reminder]), PeopleModule ],
  controllers: [RemindersController],
  providers: [RemindersService]
})
export class RemindersModule {}
