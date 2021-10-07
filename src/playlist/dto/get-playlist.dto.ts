import { ApiProperty } from "@nestjs/swagger";
import { Playlist } from "../entities/playlist.entity";
import { ContentToPlaylistDto } from "./content-to-playlist.dto";

export class GetPlaylistDto {
  constructor(playlist: Playlist) {
    this.id = playlist.id;
    this.authorId = playlist.authorId;
    this.contentToPlaylist = playlist.contentToPlaylist;
  }

  @ApiProperty({ type: String, example: "1" })
  id: string;
  @ApiProperty({ type: String, example: "1" })
  authorId: string;

  @ApiProperty({ type: String, example: "1" })
  displayId: string;

  @ApiProperty({
    type: ContentToPlaylistDto,
    example: ContentToPlaylistDto,
  })
  contentToPlaylist: ContentToPlaylistDto[];
}
