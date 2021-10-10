import { ApiProperty } from "@nestjs/swagger";
import { CreateEventDto } from "./create-event.dto";

export class UpdateEventDto extends CreateEventDto {
  @ApiProperty({
    description: "new title for event",
    example: "New Awesome title",
  })
  title: string;
}
