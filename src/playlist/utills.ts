import { ContentToPlaylistDto } from "./dto/content-to-playlist.dto";
import { ContentToPlaylist } from "./entities/content-to-playlist.entity";

export function ContentToPlayistFromDto(
  dto: ContentToPlaylistDto,
  playlistId: string
) {
  const ret = new ContentToPlaylist();
  ret.order = dto.order;
  ret.duration = dto.duration;
  ret.contentId = dto.contentID;
  ret.playlistId = playlistId;
  return ret;
}
