import { ApiProperty } from "@nestjs/swagger";
import { Display } from "../entities/display.entity";

export class GetDisplayDto {
  constructor(display: Display) {
    this.id = display.id;
    this.authorId = display["__author__"].id;
  }
  @ApiProperty()
  id: string;
  @ApiProperty()
  authorId: string;
}
