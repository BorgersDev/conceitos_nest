import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Reminder } from './entities/reminder.entity';
import { read } from 'fs';
import { create } from 'domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateReminderDto } from './dto/update-recado.dto';

@Injectable()
export class RemindersService {
  constructor(
    @InjectRepository(Reminder)
    private remindersRepository: Repository<Reminder>,
  ) {}

  async findAll() {
    const reminders = await this.remindersRepository.find();
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
    const newReminder = {
      ...data,
      read: false,
      createdAt: new Date()
    }

    const reminder = this.remindersRepository.create(newReminder)
    return this.remindersRepository.save(reminder);
  }

  async update(id: number, updateReminderDto: UpdateReminderDto) {
    const partialUpdateReminderDto = {
      read: updateReminderDto?.read,
      text: updateReminderDto?.text,
    }
    const reminder = await this.remindersRepository.preload({ 
      id,
      ...partialUpdateReminderDto,
    });
    if (!reminder) {
      throw new NotFoundException('Reminder not found');
    }
    return this.remindersRepository.save(reminder);
  }

  async remove(id: number) {
    const reminder = await this.remindersRepository.findOneBy({ id });
    if (!reminder) {
      throw new NotFoundException('Reminder not found');
    }
    return this.remindersRepository.remove(reminder); 
  }
}
