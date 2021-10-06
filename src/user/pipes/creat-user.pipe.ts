import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { CreateUserDto } from "../dto/create-user.dto";

@Injectable()
export class CreateUserPipe implements PipeTransform {
  constructor(private userService: UserService) {}

  async transform(value: CreateUserDto, meta: ArgumentMetadata) {
    const userByName = await this.userService.findOneByName(value.username);
    const userByEmail = await this.userService.findOneByEmail(value.email);
    if (userByEmail || userByName)
      throw new BadRequestException("User with email or login already exists");
    return value;
  }
}
