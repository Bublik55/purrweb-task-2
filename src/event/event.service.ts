import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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
    private userRepository: Repository<User>
  ) {}
  async create(createEventDto: CreateEventDto) {
    const event = new Event();
    const user = await this.userRepository.findOne(createEventDto.user);
    event.user = Promise.resolve(user);
    return this.eventRepository.save(event);
  }

  async findAll(authorId: string) {
    return await this.eventRepository.find({
      relations: ["user", "displays"],
      where: `Event.user = ${authorId}`,
    });
  }

  // async findAll() {
  //   return await this.eventRepository.find({ relations: ["user", "displays"] });
  // }

  //@Warnig QUERY FOR ALL USERS PLAYLISTS
  async findOne(id: number) {
    const event = await this.eventRepository.findOne(id);
    if (event) return event;
    else throw new NotFoundException(`Cannot find user with uuid ${id}`);
  }

  //@TODO Return after complete displays
  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  async remove(id: number) {
    const res = await this.eventRepository.delete(id);
    if (res.affected) return true;
    else return false;
  }
}
