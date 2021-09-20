import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserOwnerGuard } from './guards/owner.guards/user.owner.guard';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    PassportModule,
    UserModule, 
    JwtModule.register({
      secret: "process.env.JWTKEY",
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    UserOwnerGuard,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
