import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class CreateDisplayDto {
  @ApiProperty({
    description: "Event's id to attach display",
    type: String,
    example: "2",
  })
  eventId: string;
  @ApiProperty({
    description: "Author id",
    type: String,
    example: "2",
  })
  @IsNumberString()
  authorId: string;
}
