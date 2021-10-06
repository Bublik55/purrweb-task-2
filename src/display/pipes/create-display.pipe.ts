import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from "@nestjs/common";
import { CreateDisplayDto } from "src/display/dto/create-display.dto";
import { EventService } from "src/event/event.service";

@Injectable()
export class CreateDisplayPipe implements PipeTransform {
  constructor(private eventService: EventService) {}

  async transform(value: CreateDisplayDto, meta: ArgumentMetadata) {
    if (value.eventId) {
      const obj = await this.eventService.findOne(+value.eventId);
      if (!obj) throw new NotFoundException("Event to attach doesn't exists");
    }
    return value;
  }
}
