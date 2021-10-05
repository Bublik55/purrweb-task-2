import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserGuard } from "src/user/guards/user.guard";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: `${process.env.JWTKEY}`,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION + "" },
    }),
  ],
  providers: [AuthService, JwtStrategy, UserGuard],
  controllers: [AuthController],
})
export class AuthModule {}
