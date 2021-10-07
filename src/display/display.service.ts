import { forwardRef, Inject, Injectable } from "@nestjs/common";
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
    @Inject(forwardRef(() => EventService))
    private eventService: EventService
  ) {}

  async create(dto: CreateDisplayDto) {
    const display = new Display();
    display.author = this.userService.findOneById(dto.authorId);
    display.event = this.eventService.findOne(+dto.eventId);
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
    try {
      const display = await this.displayRepository.findOne(id);
      console.log(display);
      display.event = this.eventService.findOne(+dto.eventId);
      this.displayRepository.save(display);
    } catch (e) {
      console.log(e);
    }
  }

  async remove(id: number) {
    await this.displayRepository.delete(id);
  }
}
