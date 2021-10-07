import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserEntityIds } from "../../common/utills";
import { ContentService } from "../content.service";
@Injectable()
export class ContentGuard extends AuthGuard("jwt") {
  constructor(private contentService: ContentService) {
    super(contentService);
  }

  async canActivate(context: ExecutionContext) {
    const userEntityIds = UserEntityIds(context);
    const content = await this.contentService.findOne(userEntityIds.entityID);
    if ((await content.author).id == userEntityIds.userID) {
      return true;
    } else throw new ForbiddenException("Forbidden operation for user");
  }
}
