import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";

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
    user;
    return user.id;
  }

  public async login(loginDto) {
    const user = await this.userService.findOneByName(loginDto.name);
    if (await this.validateUser(loginDto.name, loginDto.password)) {
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
    const token = await this.jwtService.signAsync({
      id: data.id,
      name: data.name,
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
