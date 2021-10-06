import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal } from "class-validator";

export class CreateDisplayDto {
  @ApiProperty({
    description: "Author id",
    type: String,
    example: "3",
  })
  @IsDecimal()
  authorId: string;

  @ApiProperty({
    description: "Event's id to attach display",
    type: String,
    example: "2",
  })
  @IsDecimal()
  eventId: string;

  @ApiProperty()
  @IsDecimal()
  playlistId: string;
}
