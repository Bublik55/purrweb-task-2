import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateContentDto } from "./dto/create-content.dto";
import { UpdateContentDto } from "./dto/update-content.dto";
import { Content, CONTENT_TYPE } from "./entities/content.entity";

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>
  ) {}

  async create(createContentDto: CreateContentDto) {
    const content = new Content();
    try {
      content.contentType =
        CONTENT_TYPE[createContentDto.contentType.toUpperCase()];
      content.url = createContentDto.url;
      return await this.contentRepository.save(content);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll() {
    return await this.contentRepository.find();
  }

  async findOne(id: number) {
    const res = await this.contentRepository.findOne(id);
    if (res) return res;
    else throw new NotFoundException(`Content with id = ${id} does not exists`);
  }

  async update(id: number, updateContentDto: UpdateContentDto) {
    const obj = await this.contentRepository.findOne(id);
    if (!obj)
      throw new NotFoundException(`Content with id = ${id} does not exists`);
    obj.url = updateContentDto.url;
    obj.contentType = CONTENT_TYPE[updateContentDto.contentType.toUpperCase()];
    return await this.contentRepository.update(id, obj);
  }

  async remove(id: string) {
    const user = await this.contentRepository.delete(id);
    if (user.affected) return true;
    else return false;
  }
}
