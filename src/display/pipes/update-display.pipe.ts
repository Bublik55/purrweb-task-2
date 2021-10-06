import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from "@nestjs/common";
import { EventService } from "src/event/event.service";
import { UpdateDisplayDto } from "../dto/update-display.dto";

@Injectable()
export class UpdateDisplayPipe implements PipeTransform {
  constructor(private eventService: EventService) {}

  async transform(value: UpdateDisplayDto, meta: ArgumentMetadata) {
    if (value.eventId) {
      const obj = await this.eventService.findOne(+value.eventId);
      if (!obj) throw new NotFoundException("Event to attach doesn't exists");
    }
    return value;
  }
}
