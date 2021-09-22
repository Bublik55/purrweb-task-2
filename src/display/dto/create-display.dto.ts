import { ApiProperty } from "@nestjs/swagger";

export class CreateDisplayDto {
  @ApiProperty({
    description: "Event's id to attach display",
    type: String,
    example: "2",
  })
  event: string;
}
