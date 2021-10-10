import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserEntityIds } from "../../common/utills";
import { DisplayService } from "../display.service";
@Injectable()
export class DisplayGuard extends AuthGuard("jwt") {
  constructor(private displayService: DisplayService) {
    super(displayService);
  }

  async canActivate(context: ExecutionContext) {
    const userEntityIds = UserEntityIds(context);
    const display = await this.displayService.findOne(userEntityIds.entityID);
    if (display && (await display.author).id == userEntityIds.userID) {
      return true;
    } else throw new ForbiddenException("Forbidden operation for user");
  }
}
