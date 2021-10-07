import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserEntityIds } from "../../common/utills";
import { PlaylistService } from "../playlist.service";
@Injectable()
export class PlaylistOwnerGuard extends AuthGuard("jwt") {
  constructor(private playlistService: PlaylistService) {
    super(playlistService);
  }

  async canActivate(context: ExecutionContext) {
    const userEntityIds = UserEntityIds(context);
    const playlist = await this.playlistService.findOne(userEntityIds.entityID);
    if ((await playlist.author).id == userEntityIds.userID) {
      return true;
    } else throw new ForbiddenException("Forbidden operation for user");
  }
}
