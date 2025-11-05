import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ApplicationModule } from './modules/application/application.module';

@Module({
  imports: [AuthModule, ApplicationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
