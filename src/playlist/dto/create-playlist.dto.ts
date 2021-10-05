import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNumberString } from "class-validator";
import { ContentToPlaylistDto } from "./content-to-playlist.dto";

const exa: ContentToPlaylistDto = new ContentToPlaylistDto();
exa.contentID = "1";
exa.duration = "2.23";
exa.order = "23";
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
    example: [exa],
    type: [ContentToPlaylistDto],
  })
  content: ContentToPlaylistDto[];
}
