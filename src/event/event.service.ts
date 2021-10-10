import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DisplayService } from "src/display/display.service";
import { Repository } from "typeorm";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { Event } from "./entities/event.entity";

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @Inject(forwardRef(() => DisplayService))
    private displayService: DisplayService
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
    await this.eventRepository.update(id, updateEventDto);
  }

  async remove(id: number) {
    await this.eventRepository.delete(id);
  }

  async attachDisplayToEvent(id: string, displayId: string) {
    const event = await this.findOne(+id);
    const display = await this.displayService.findOne(+displayId);
    (await event.displays).push(display);
    console.log(event);
    this.eventRepository.save(event);
  }
}
