import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RemindersService } from './reminders.service';

@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}
  @Get()
  findAll(@Query() pagination: any) {
    const { limit = 10, offset = 0 } = pagination
    return this.remindersService.findAll({ limit, offset })
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.remindersService.findOne(id)
  }

  @Post()
  create(@Body() body: any) {
    return this.remindersService.create(body)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return {
      id,
      ...body,
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.remindersService.remove(id)
  }
}
