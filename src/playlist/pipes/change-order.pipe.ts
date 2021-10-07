import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";
import { UpdateContentToPlaylistDto } from "../dto/update-contentToPlaylist.dto";
import { PlaylistService } from "../playlist.service";

@Injectable()
export class ChangeOrderValidation implements PipeTransform {
  constructor(private service: PlaylistService) {}

  async transform(
    value: UpdateContentToPlaylistDto,
    metadata: ArgumentMetadata
  ) {
    const ctp = await this.service.getContentToPlaylistById(
      value.contentToPlaylistId
    );
    const playlist = await this.service.findOne(+ctp.playlistId);
    const size = playlist.contentToPlaylist.length;
    if (+value.order > size) throw new BadRequestException("Bad Order");
  }
}
