import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";
import { CreatePlaylistDto } from "./create-playlist.dto";

export class dataToUpdate extends CreatePlaylistDto {
  constructor(id, order, dur) {
    super();
    this.contentToPlaylistId = id;
    this.newOrder = order;
    this.newDuration = dur;
  }
  @IsNumberString()
  @ApiProperty({
    description: "ID contentToPlaylist to update",
    example: "1",
  })
  contentToPlaylistId: string;

  @ApiProperty({
    description: "New order",
    example: "12",
  })
  @IsNumberString()
  newOrder: string;

  @ApiProperty({
    description: "ID new Duration to update",
    example: "1.232",
  })
  @IsNumberString()
  newDuration: string;
}

export class UpdatePlaylistDto {
  @ApiProperty({
    description: "Data To Update",
    example: [new dataToUpdate(1, 2, 3), new dataToUpdate(3, 2, 1)],
    type: dataToUpdate,
  })
  data: dataToUpdate[];
}
