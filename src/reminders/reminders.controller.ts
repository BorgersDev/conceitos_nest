import { Controller, Get } from '@nestjs/common';

@Controller('reminders')
export class RemindersController {
  @Get()
  findAll() {
    return 'Return all reminders'
  }

  @Get(':id')
  findOne() {
    return 'Return one reminder'
  }
}
