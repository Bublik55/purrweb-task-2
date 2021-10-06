import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";
import { CONTENT_TYPE } from "../entities/content.entity";

export class CreateContentDto {
  @IsNumberString()
  @ApiProperty({
    description: "AuthorId",
    example: "1",
  })
  authorId: string;

  @ApiProperty({
    description: "Type of content [PICTURE, HTML, VIDEO, AUDIO]",
    example: CONTENT_TYPE.HTML,
  })
  contentType: CONTENT_TYPE;

  @ApiProperty({
    description: "Path to content",
    type: String,
    example: "RANDOM PATH",
  })
  path: string;
}
