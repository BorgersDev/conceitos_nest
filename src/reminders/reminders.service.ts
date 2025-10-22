import { Injectable, NotFoundException } from '@nestjs/common';
import { Reminder } from './entities/reminder.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateReminderDto } from './dto/update-recado.dto';
import { PeopleService } from 'src/people/people.service';
import { CreateReminderDto } from './dto/create-reminder.dto';

@Injectable()
export class RemindersService {
  constructor(
    @InjectRepository(Reminder)
    private remindersRepository: Repository<Reminder>,
    private readonly people: PeopleService,
  ) {}

  async findAll() {
    const reminders = await this.remindersRepository.find({
      relations: [ 'from', 'to' ],
      order: {
        id: 'desc'
      },
      select:{
        from: {
          id: true,
          name: true,
        },
        to: {
          id: true,
          name: true,
        }
      }
    });
    return reminders;
  }

  async findOne(id: number) {
    const reminder = await this.remindersRepository.findOne({ where: { id } });
    if (!reminder) {
      throw new NotFoundException('Reminder not found');
    }
    return reminder;
  }

  async create(data: any) {
    const { fromId, toId } = data;

    const from = await this.people.findOne(fromId);

    const to = await this.people.findOne(toId);

    const newReminder = {
      text: data.text,
      from,
      to,
      read: false,
    }

    const reminder = this.remindersRepository.create(newReminder)
    this.remindersRepository.save(reminder);
    return {
      ...reminder,
      fromId: {
        id: from.id,
      },
      toId: {
        id: to.id,
      },
    }
  }

  async update(id: number, updateReminderDto: UpdateReminderDto) {
    const reminder = await this.findOne(id);
    reminder.text = updateReminderDto.text ?? reminder.text;
    reminder.read = updateReminderDto.read ?? reminder.read;
    await this.remindersRepository.save(reminder);
    return reminder;
  }

  async remove(id: number) {
    const reminder = await this.remindersRepository.findOneBy({ id });
    if (!reminder) {
      throw new NotFoundException('Reminder not found');
    }
    return this.remindersRepository.remove(reminder); 
  }
}
