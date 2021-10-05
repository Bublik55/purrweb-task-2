import { ApiProperty } from "@nestjs/swagger";

export class CreateEventDto {
  @ApiProperty({
    description: "Owner/author id",
    type: String,
    example: "1",
  })
  authorId: string;

  @ApiProperty({
    description: "Title of event",
    type: String,
    example: "BEST EVENT",
  })
  title: string;
}
