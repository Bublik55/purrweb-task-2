import { ApiProperty } from "@nestjs/swagger";
import { randomUUID } from "crypto";

export class CreateEventDto {
  @ApiProperty({
    description: "Owner/author id",
    type: String,
    example: randomUUID,
  })
  user: string;
}
