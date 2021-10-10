import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { CreateEventDto } from "./create-event.dto";

export class UpdateEventDto extends CreateEventDto {
  @IsString()
  @ApiProperty({
    description: "new title for event",
    example: "New Awesome title",
  })
  title: string;
}
