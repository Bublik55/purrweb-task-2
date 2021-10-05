import { ApiProperty } from "@nestjs/swagger";
import { Display } from "../entities/display.entity";

export class GetDisplayDto {
  constructor(display: Display) {
    this.id = display.id;
    this.playlistId = display.playlist.id;
    this.eventId = display.event.id;
    this.playlistId = display.playlist.id;
  }
  @ApiProperty()
  id: string;

  @ApiProperty()
  authorId: string;

  @ApiProperty()
  eventId: string;

  @ApiProperty()
  playlistId: string;
}
