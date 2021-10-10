import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserDtoIds } from "../utills";

@Injectable()
export class CreatorGuard extends AuthGuard("jwt") {
  constructor() {
    super({});
  }

  canActivate(context: ExecutionContext) {
    const udi = UserDtoIds(context);
    if (udi.userDtoId == udi.authorId) {
      return true;
    } else throw new ForbiddenException("Forbidden operation for user");
  }
}
