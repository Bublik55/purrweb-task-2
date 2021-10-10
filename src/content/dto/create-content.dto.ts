import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumberString, IsString } from "class-validator";
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
  @IsEnum(CONTENT_TYPE)
  contentType: CONTENT_TYPE;

  @IsString()
  @ApiProperty({
    description: "Path to content",
    type: String,
    example: "RANDOM PATH",
  })
  path: string;
}
