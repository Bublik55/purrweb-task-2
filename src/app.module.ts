import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataBaseModule } from './database.providers';
import { UserModule } from './user/user.module';
import { AuthModule } from './utils/auth/auth.module';

@Module({
  imports: [UserModule, AuthModule,DataBaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
