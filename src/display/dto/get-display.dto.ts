import { Display } from "../entities/display.entity";

export class GetDisplayDto {
  constructor(display: Display) {
    this.id = display.id;
    this.plailistId = display.playlist.id;
  }
  id: string;
  plailistId: string;
}
