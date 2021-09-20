import { ApiProperty } from "@nestjs/swagger";
import { CONTENT_TYPE } from "../entities/content.entity";

export class CreateContentDto {
  @ApiProperty({
    description: "Type of content [PICTURE, HTML, VIDEO, AUDIO]",
    example: CONTENT_TYPE.HTML,
  })
  contentType: string;

  @ApiProperty({
    description: "Path to content",
    type: String,
    example: "RANDOM PATH",
  })
  url: string;
}
