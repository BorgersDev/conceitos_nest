import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Reminder } from './entities/reminder.entity';
import { read } from 'fs';
import { create } from 'domain';

@Injectable()
export class RemindersService {
  private lastId = 1;
  private reminders: Reminder[] = [
    {
      id: 1,
      text: 'Estudar NestJS',
      from: 'Arthur Borges',
      to: 'Arthur Borges',
      read: false,
      createdAt: new Date()
    },
  ];

  findAll() {
    return this.reminders;
  }

  findOne(id: string) {
    const reminder = this.reminders.find((reminder) => reminder.id === Number(id));
    if (!reminder) {
      throw new NotFoundException('Reminder not found');
    }
    return reminder;
  }

  create(data: any) {
    this.lastId++;
    const newReminder = {
      id: this.lastId,
      ...data,
      read: false,
      createdAt: new Date()
    }
    this.reminders.push(newReminder);
    console.log('New reminder created')
    return newReminder;
  }

  update(id: string, data: any) {
    const reminderIndex = this.reminders.findIndex((reminder) => reminder.id === Number(id));
    if (reminderIndex < 0) {
      throw new NotFoundException('Reminder not found');
    }
    const updatedReminder = {
      ...this.reminders[reminderIndex],
      ...data
    }
    this.reminders[reminderIndex] = updatedReminder;
    console.log('Reminder updated')
    return updatedReminder;
  }

  remove(id: string) {
    const reminderIndex = this.reminders.findIndex((reminder) => reminder.id === Number(id));
    if (reminderIndex < 0) {
      throw new NotFoundException('Reminder not found');
    }
    this.reminders.splice(reminderIndex, 1);
    console.log('Reminder deleted')
    return { message: 'Reminder deleted' };
  }
}
