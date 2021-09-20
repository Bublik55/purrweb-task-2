import { ApiProperty } from "@nestjs/swagger";
import { Event } from "src/event/entities/event.entity";

export class CreateDisplayDto {
  @ApiProperty({
    description: "Event's id to attach display",
    type: String,
    example: '2',
  })
	event: string;
}
