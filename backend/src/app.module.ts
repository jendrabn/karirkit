import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ApplicationModule } from './modules/application/application.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [AuthModule, ApplicationModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
