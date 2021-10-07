import { ApiProperty } from "@nestjs/swagger";
import { Event } from "../entities/event.entity";

export class GetEventDto {
  constructor(event: Event) {
    this.id = event.id;
    this.title = event.title;
    this.authorId = event["__author__"].id;
    this.displayIds = event["__displays__"].map((e) => e.id);
  }
  @ApiProperty({ type: String, example: "1" })
  id: string;

  @ApiProperty({ type: String, example: "1" })
  authorId: string;

  @ApiProperty({ type: String, example: "Common title" })
  title: string;

  @ApiProperty({ type: [String], example: "Common title" })
  displayIds: string[];
}
