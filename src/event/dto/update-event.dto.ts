import { ApiProperty } from "@nestjs/swagger";
import { CreateEventDto } from "./create-event.dto";

export class UpdateEventDto extends CreateEventDto {
  @ApiProperty({ description: "displays ids as attachment" })
  displays: string[];

  @ApiProperty({ description: "new title for event" })
  title: string;
}
