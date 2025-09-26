import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceptsAutoService {
  handleHome(): string {
    return 'Home Concepts Auto Service test'
  }
}
