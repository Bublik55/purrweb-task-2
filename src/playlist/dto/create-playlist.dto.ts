import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";
import { ContentToPlaylistDto } from "./content-to-playlist.dto";

export class CreatePlaylistDto {
  @IsNumberString()
  @ApiProperty({
    description: "Displayid to attach playlist",
    example: "1",
  })
  displayId: string;

  @IsNumberString()
  @ApiProperty({
    description: "AuthorId",
    example: "1",
  })
  authorId: string;

  @ApiProperty({
    description: "This contain array of [contentId, order, duration]",
    example: ContentToPlaylistDto,
    type: [ContentToPlaylistDto],
  })
  contentToPlaylist: ContentToPlaylistDto[];
}
