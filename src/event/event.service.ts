import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Display } from "src/display/entities/display.entity";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { Event } from "./entities/event.entity";

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Display)
    private displayRepository: Repository<Display>
  ) {}

  async create(createEventDto: CreateEventDto) {
    return this.eventRepository.save(createEventDto);
  }

  async findAll() {
    return this.eventRepository.find({
      relations: ["author", "displays"],
    });
  }

  async findOne(id: number) {
    const event = await this.eventRepository.findOne(id, {
      relations: ["author", "displays"],
    });
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.eventRepository.findOne(id, {
      relations: ["displays"],
    });
    if (updateEventDto.title) {
      event.title = updateEventDto.title;
    }
    // REVU: можно просто использовать displays: [{ id: id1 }, { id: id2 }]
    // Для чего используется Promise.resolve? нужен ли он здесь?
    updateEventDto.displayIds.forEach(async (element) => {
      const display = await this.displayRepository.findOne(element);
      (await event.displays).push(display);
    });
    return await this.eventRepository.update(id, event);
  }

  async remove(id: number) {
    const res = await this.eventRepository.delete(id);
    if (res.affected) return true;
    else return false;
  }
}
