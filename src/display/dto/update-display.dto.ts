import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal } from "class-validator";

export class UpdateDisplayDto {
  @ApiProperty({
    description: "Event id to attach display",
    type: String,
    example: "2",
  })
  @IsDecimal()
  eventId: string;

  @IsDecimal()
  displayId: string;
}
