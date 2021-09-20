import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
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
    const event = new Event();
    const user = await this.userRepository.findOne(createEventDto.user);
    event.user = Promise.resolve(user);
    if (user) return this.eventRepository.save(event);
    else throw new BadRequestException();
  }

  //@Warnig QUERY FOR ALL USERS PLAYLISTS
  async findAll(authorId: string) {
    return await (
      await this.userRepository.findOne(authorId)
    ).events;
  }

  async findOne(id: number) {
    const event = await this.eventRepository.findOne(id);
    if (event) return event;
    else throw new NotFoundException(`Cannot find event with id ${id}`);
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.eventRepository.findOne(id);
    if (updateEventDto.title) {
      event.title = updateEventDto.title;
    }
    updateEventDto.displays.forEach(async (element) => {
      const display = await this.displayRepository.findOne(element);
      event.displays.push(display);
    });
    return await this.eventRepository.save(event);
  }

  async remove(id: number) {
    const res = await this.eventRepository.delete(id);
    if (res.affected) return true;
    else return false;
  }
}
