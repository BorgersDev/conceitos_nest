import { Controller, Get } from '@nestjs/common';
import { ConceptsAutoService } from './concepts-auto.service';

@Controller('concepts-auto')
export class ConceptsAutoController {
  constructor(private readonly conceptsAutoService: ConceptsAutoService) {}
  @Get()
  home(): string {
    return this.conceptsAutoService.handleHome()
  }
}
