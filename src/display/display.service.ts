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
  ) { }

  async create(createDisplayDto: CreateDisplayDto) {
    const event = await this.eventRepository.findOne(createDisplayDto.event);
    const display = new Display();
    display.event = event;
    return await this.displayRepository.save(display);
  }


  //Return all displays of event
  async findAll(eventId: string) {
    return await this.displayRepository.find({ relations: ["event"], where: `Display.event = ${eventId}` });
  }

  findOne(id: number) {
    return `This action returns a #${id} display`;
  }

  update(id: number, updateDisplayDto: UpdateDisplayDto) {
    return `This action updates a #${id} display`;
  }

  async remove(id: number) {
    const res = await this.displayRepository.delete(id);
    if (res.affected) return true;
    else return false;  }
}
