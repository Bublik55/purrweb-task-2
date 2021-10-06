import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";
import { ContentToPlaylistDto } from "./content-to-playlist.dto";

export class CreatePlaylistDto {
  @ApiProperty({
    description: "Displayid to attach playlist",
    example: "1",
  })
  displayId: string;

  @ApiProperty({
    description: "AuthorId",
    example: "1",
  })
  @IsNumberString()
  authorId: string;

  @ApiProperty({
    description: "This contain array of [contentId, order, duration]",
    example: ContentToPlaylistDto,
    type: [ContentToPlaylistDto],
  })
  contentToPlaylist: ContentToPlaylistDto[];
}
