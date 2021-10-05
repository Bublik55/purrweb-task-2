import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal } from "class-validator";

export class UpdateDisplayDto {
  @ApiProperty({
    description: "Playlist's id to attach display",
    type: String,
    example: "2",
  })
  @IsDecimal()
  // REVU: playlistId, и логичнее передавать массивом несколько айдишников
  playlistId: string;

  @IsDecimal()
  displayId: string;
}
