import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Event } from "src/event/entities/event.entity";
import { Repository } from "typeorm";
import { CreateDisplayDto } from "./dto/create-display.dto";
import { UpdateDisplayDto } from "./dto/update-display.dto";
import { Display } from "./entities/display.entity";

@Injectable()
export class DisplayService {
  constructor(
    @InjectRepository(Display)
    private displayRepository: Repository<Display>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>
  ) {}

  create(createDisplayDto: CreateDisplayDto) {
    return "This action adds a new display";
  }

  findAll() {
    return `This action returns all display`;
  }

  findOne(id: number) {
    return `This action returns a #${id} display`;
  }

  update(id: number, updateDisplayDto: UpdateDisplayDto) {
    return `This action updates a #${id} display`;
  }

  remove(id: number) {
    return `This action removes a #${id} display`;
  }
}
