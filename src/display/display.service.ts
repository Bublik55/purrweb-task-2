import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EventService } from "src/event/event.service";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";
import { CreateDisplayDto } from "./dto/create-display.dto";
import { UpdateDisplayDto } from "./dto/update-display.dto";
import { Display } from "./entities/display.entity";

@Injectable()
export class DisplayService {
  constructor(
    @InjectRepository(Display)
    private displayRepository: Repository<Display>,
    private userService: UserService,
    private eventService: EventService
  ) {}

  async create(dto: CreateDisplayDto) {
    const display = new Display();
    display.author = await this.userService.findOneById(dto.authorId);
    display.event = await this.eventService.findOne(+dto.eventId);
    return this.displayRepository.save(display);
  }

  async findAll(): Promise<Display[]> {
    return await this.displayRepository.find({
      relations: ["event", "author"],
    });
  }

  async findOne(id: number) {
    const display = await this.displayRepository.findOne(id, {
      relations: ["event", "author"],
    });
    return display;
  }

  async update(id: number, dto: UpdateDisplayDto) {
    const display = await this.displayRepository.findOne(id);
    display.event = await this.eventService.findOne(+dto.eventId);
    this.displayRepository.update(id, display);
  }

  async remove(id: number) {
    await this.displayRepository.delete(id);
  }
}
