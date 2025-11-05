import { Module } from '@nestjs/common';
import { PrismaService } from './providers/prisma.service';
import { ValidationService } from './providers/validation.service';

@Module({
  providers: [PrismaService, ValidationService],
})
export class CommonModule {}
