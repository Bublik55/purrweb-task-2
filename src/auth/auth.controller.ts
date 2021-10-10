import { Body, Controller, Post } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { Public } from "../common/guards/jwt-auth.guard";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { SignupPipe } from "./pipes/signup.pipe";

@Public()
@ApiTags(`Auth`)
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @ApiOperation({ summary: "Login User" })
  @ApiOkResponse({
    status: 200,
    description: "Ok login",
  })
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post(`signup`)
  @ApiOperation({ summary: "SignUp User" })
  @ApiOkResponse({
    status: 201,
    description: "User registred",
  })
  async signUp(@Body(SignupPipe) createUserDto: CreateUserDto) {
    return await this.authService.create(createUserDto);
  }
}
