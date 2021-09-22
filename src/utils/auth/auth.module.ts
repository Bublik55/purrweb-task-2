import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserOwnerGuard } from "./guards/owner.guards/user.owner.guard";
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
  providers: [AuthService, JwtStrategy, UserOwnerGuard],
  controllers: [AuthController],
})
export class AuthModule {}
