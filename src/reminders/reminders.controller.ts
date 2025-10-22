import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-recado.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}
  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.remindersService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.remindersService.findOne(id)
  }

  @Post()
  create(@Body() createReminderDto: CreateReminderDto) {
    return this.remindersService.create(createReminderDto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateReminderDto: UpdateReminderDto) {
    return this.remindersService.update(id, updateReminderDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.remindersService.remove(id)
  }
}
