import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from "@nestjs/common";
import { EventService } from "src/event/event.service";

@Injectable()
export class EventExistsPipe implements PipeTransform {
  constructor(private service: EventService) {}

  async transform(id: string, meta: ArgumentMetadata) {
    const event = await this.service.findOne(+id);
    if (!event) throw new NotFoundException("Event don't exists");
    return id;
  }
}
