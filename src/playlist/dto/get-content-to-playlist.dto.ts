import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";
import { ContentToPlaylist } from "../entities/content-to-playlist.entity";

export class GetContentToPlaylistDto {
  constructor(obj: ContentToPlaylist) {
    this.contentId = obj.id;
    this.order = obj.order;
    this.duration = obj.duration;
  }
  @IsNumberString()
  @ApiProperty({
    description: "This is content's id to attach",
    example: "1",
    type: String,
  })
  contentId: string;

  @IsNumberString()
  @ApiProperty({
    description: "This is content's order in playlist",
    example: "2",
    type: String,
  })
  order: string;

  @IsNumberString()
  @ApiProperty({
    description: "This is content's duration",
    example: "5.67",
    type: String,
  })
  duration: string;
}
