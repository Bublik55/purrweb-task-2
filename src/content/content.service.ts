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

  async create(dto: CreateContentDto): Promise<Content> {
    return await this.contentRepository.save(dto);
  }

  async findAll(): Promise<Content[]> {
    return await this.contentRepository.find();
  }

  async findOne(id: number): Promise<Content> {
    return await this.contentRepository.findOne(id);
  }

  async update(id: number, dto: UpdateContentDto): Promise<void> {
    await this.contentRepository.update(id, dto);
  }

  async remove(id: string): Promise<void> {
    await this.contentRepository.delete(id);
  }
}
