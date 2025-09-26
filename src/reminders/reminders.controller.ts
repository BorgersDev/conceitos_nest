import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('reminders')
export class RemindersController {
  @Get()
  findAll() {
    return 'Return all reminders'
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Return one reminder with id ${id}`
  }

  @Post()
  create(@Body() body: any) {
    return `Create a new reminder with title "${body.title}"`
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
    return `Delete reminder with id: ${id}`
  }
}
