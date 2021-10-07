import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from "@nestjs/common";
import { PlaylistService } from "src/playlist/playlist.service";

@Injectable()
export class PlaylistExistsPipe implements PipeTransform {
  constructor(private service: PlaylistService) {}

  async transform(id: string, meta: ArgumentMetadata) {
    const display = await this.service.findOne(+id);
    if (!display) throw new NotFoundException("Playlist don't exists");
    return id;
  }
}
