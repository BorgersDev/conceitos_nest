import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConceptsModule } from './concepts/concepts.module';
import { ConceptsAutoModule } from './concepts-auto/concepts-auto.module';

@Module({
  imports: [ConceptsModule, ConceptsAutoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
