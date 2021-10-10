import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(name: string, pass: string) {
    const user = await this.userService.findOneByName(name);
    if (!user) {
      return null;
    }
    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }
    // REVU: ????
    user;
    return user.id;
  }

  public async login(loginDto: LoginDto) {
    const user = await this.userService.findOneByName(loginDto.username);
    if (await this.validateUser(loginDto.username, loginDto.password)) {
      const token = await this.generateToken(user);
      return { token };
    } else throw new HttpException("BadRequest", HttpStatus.BAD_REQUEST);
  }

  public async create(user) {
    const pass = await this.hashPassword(user.password);
    const newUser = await this.userService.create({ ...user, password: pass });
    const token = await this.generateToken(newUser);
    return { token };
  }

  private async generateToken(data: User) {
    // REVU: нет sub и aud
    const token = await this.jwtService.signAsync({
      aud: "user",
      sub: "auth",
      id: data.id,
      name: data.username,
      password: data.password,
      email: data.email,
    });
    return token;
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}
