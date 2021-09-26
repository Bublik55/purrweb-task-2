import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Display } from "src/display/entities/display.entity";
import { Playlist } from "src/playlist/entities/playlist.entity";
import { Repository } from "typeorm";
import { UserEntityIds } from "./utills";
@Injectable()
export class PlaylistOwnerGuard extends AuthGuard("jwt") {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>
  ) {
    super(playlistRepository);
  }

  async canActivate(context: ExecutionContext) {
    const userEntityIds = UserEntityIds(context);
    const playlist = await this.playlistRepository.findOne(
      userEntityIds.entityID,
      {
        relations: ["author"],
      }
    );
    if ((await playlist.author).id == userEntityIds.userID) {
      return true;
    } else throw new ForbiddenException("Forbidden operation for user");
  }
}
