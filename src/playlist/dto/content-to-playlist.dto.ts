import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";
import { ContentToPlaylist } from "../entities/content-to-playlist.entity";
export class ContentToPlaylistDto {
  constructor(obj: ContentToPlaylist) {
    this.contentId = obj.contentId;
    this.duration = obj.duration;
    this.order = obj.order;
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
