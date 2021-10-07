import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from "@nestjs/common";
import { DisplayService } from "src/display/display.service";

@Injectable()
export class DisplayExistsPipe implements PipeTransform {
  constructor(private service: DisplayService) {}

  async transform(id: string, meta: ArgumentMetadata) {
    const display = await this.service.findOne(+id);
    if (!display) throw new NotFoundException("Display don't exists");
    return id;
  }
}
