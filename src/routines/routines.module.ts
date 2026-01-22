import { Module } from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { RoutinesController } from './routines.controller';
import { RoutineGeneratorService } from './routine-generator.service';

@Module({
  controllers: [RoutinesController],
  providers: [RoutinesService, RoutineGeneratorService],
})
export class RoutinesModule { }
