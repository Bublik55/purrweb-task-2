import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { CreateUserDto } from "../../user/dto/create-user.dto";

@Injectable()
export class SignupPipe implements PipeTransform {
  constructor(private userService: UserService) {}

  async transform(value: CreateUserDto, meta: ArgumentMetadata) {
    console.log("lol'");
    const userByName = await this.userService.findOneByName(value.username);
    const userByEmail = await this.userService.findOneByEmail(value.email);
    if (userByEmail || userByName)
      throw new BadRequestException("User with email or login already exists");
    return value;
  }
}
