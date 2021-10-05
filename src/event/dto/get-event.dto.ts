import { ApiProperty } from "@nestjs/swagger";
import { Event } from "../entities/event.entity";

export class GetEventDto {
  constructor(event: Event) {
    this.id = event.id;
    this.title = event.title;
  }
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;
}
