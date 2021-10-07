import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from "@nestjs/common";
import { ContentService } from "src/content/content.service";
import { DisplayService } from "src/display/display.service";
import { ContentToPlaylistDto } from "../dto/content-to-playlist.dto";
import { CreatePlaylistDto } from "../dto/create-playlist.dto";
import { UpdatePlaylistDto } from "../dto/update-playlist.dto";

@Injectable()
export class PutPlaylistValidation implements PipeTransform {
  constructor(
    private contentService: ContentService,
    private displayService: DisplayService
  ) {}

  async transform(
    value: CreatePlaylistDto | UpdatePlaylistDto,
    metadata: ArgumentMetadata
  ) {
    const display = await this.displayService.findOne(+value.displayId);
    if (!display) throw new NotFoundException("Display don't exists");
    value.contentToPlaylist.forEach(async (ctp) => {
      const obj = await this.contentService.findOne(+ctp.contentId);
      if (!obj)
        throw new NotFoundException(`Can't find content ${obj.id} to attach`);
    });
    this.validateSize(value.contentToPlaylist);
    return value;
  }

  validateSize(ctp: ContentToPlaylistDto[]) {
    const values = ctp.map((e) => +e.order);
    console.log(values);
    values.sort((a, b) => +a - +b);
    const res = values.reduce((a, b) => (b - a == 1 ? b : null));
    if (!res) throw new BadRequestException("Bad Order");
  }
}
