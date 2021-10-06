import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateContentDto } from "./dto/create-content.dto";
import { UpdateContentDto } from "./dto/update-content.dto";
import { Content } from "./entities/content.entity";

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>
  ) {}

  async create(dto: CreateContentDto) {
    return await this.contentRepository.save(dto);
  }

  async findAll() {
    return await this.contentRepository.find({ relations: ["author"] });
  }

  async findOne(id: number) {
    return await this.contentRepository.findOne(id, {
      relations: ["author"],
    });
  }

  async update(id: number, dto: UpdateContentDto) {
    await this.contentRepository.update(id, dto);
  }

  async remove(id: string) {
    await this.contentRepository.delete(id);
  }
}
