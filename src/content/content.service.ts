import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
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
    content.contentType =
      CONTENT_TYPE[createContentDto.contentType.toUpperCase()];
    if (!content.contentType)
      throw new BadRequestException("Bad Format of `Content Type`");

    content.path = createContentDto.url;
    content.authorId = createContentDto.userId;
    return await this.contentRepository.save(content).catch((err) => {
      throw new BadRequestException(
        `Content with path ${content.path} already exists`
      );
    });
  }

  async findAll() {
    return await this.contentRepository.find({ relations: ["author"] });
  }

  async findOne(id: number) {
    const res = await this.contentRepository.findOne(id, {
      relations: ["author"],
    });
    if (res) return res;
    else throw new NotFoundException(`Content with id = ${id} does not exists`);
  }

  async update(id: number, updateContentDto: UpdateContentDto) {
    const obj = await this.contentRepository.findOne(id);
    if (!obj)
      throw new NotFoundException(`Content with id = ${id} does not exists`);
    obj.path = updateContentDto.url;
    obj.contentType = CONTENT_TYPE[updateContentDto.contentType.toUpperCase()];
    return await this.contentRepository.update(id, obj);
  }

  async remove(id: string) {
    const user = await this.contentRepository.delete(id);
    if (user.affected) return true;
    else return false;
  }
}
