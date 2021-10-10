import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserEntityIds } from "../../common/utills";
import { EventService } from "../event.service";
@Injectable()
export class EventGuard extends AuthGuard("jwt") {
  constructor(private eventService: EventService) {
    super(eventService);
  }

  async canActivate(context: ExecutionContext) {
    const userEntityIds = UserEntityIds(context);
    const event = await this.eventService.findOne(userEntityIds.entityID);

    if (event && event.authorId == userEntityIds.userID) {
      return true;
    } else throw new ForbiddenException("Forbidden operation for user");
  }
}
