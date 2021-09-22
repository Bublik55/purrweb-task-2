import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";
import { CreateDisplayDto } from "./create-display.dto";

export class UpdateDisplayDto extends CreateDisplayDto {
  @ApiProperty({
    description: "Playlist's id to attach display",
    type: String,
    example: "2",
  })
  @IsNumberString()
  playlist: string;
}
