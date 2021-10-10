import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class CreateEventDto {
  @IsNumberString()
  @ApiProperty({
    description: "Owner/author id",
    type: String,
    example: "1",
  })
  authorId: string;

  @IsNumberString()
  @ApiProperty({
    description: "Title of event",
    type: String,
    example: "BEST EVENT",
  })
  title: string;
}
