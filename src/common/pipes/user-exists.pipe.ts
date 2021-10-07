import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from "@nestjs/common";
import { UserService } from "src/user/user.service";

@Injectable()
export class UserExistsPipe implements PipeTransform {
  constructor(private userService: UserService) {}

  async transform(id: string, meta: ArgumentMetadata) {
    const user = await this.userService.findOneById(id);
    if (!user) throw new NotFoundException("User don't exists");
    return id;
  }
}
