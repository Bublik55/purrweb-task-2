import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from "@nestjs/common";
import { ContentService } from "../../content/content.service";
@Injectable()
export class ContentExistPipe implements PipeTransform {
  constructor(private contentService: ContentService) {}
  async transform(id: number, meta: ArgumentMetadata) {
    const obj = await this.contentService.findOne(id);
    if (obj) throw new NotFoundException("Content can't get content.");
    return id;
  }
}
