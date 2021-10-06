import { ApiProperty } from "@nestjs/swagger";
import { Content, CONTENT_TYPE } from "../entities/content.entity";

export class GetContentDto {
  constructor(obj: Content) {
    this.id = obj.id;
    this.contentType = obj.contentType;
    this.path = obj.path;
    this.authorId = obj.authorId;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  authorId: string;

  @ApiProperty()
  path: string;

  @ApiProperty()
  contentType: CONTENT_TYPE;
}
