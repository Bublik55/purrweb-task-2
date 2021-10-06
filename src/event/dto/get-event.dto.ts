import { ApiProperty } from "@nestjs/swagger";
import { Event } from "../entities/event.entity";

export class GetEventDto {
  constructor(event: Event) {
    this.id = event.id;
    this.title = event.title;
  }
  @ApiProperty({ type: String, example: "1" })
  id: string;

  @ApiProperty({ type: String, example: "Common title" })
  title: string;
}
