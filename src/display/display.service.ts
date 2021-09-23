import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Event } from "src/event/entities/event.entity";
import { Playlist } from "src/playlist/entities/playlist.entity";
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
    private eventRepository: Repository<Event>,
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>
  ) {}

  async create(createDisplayDto: CreateDisplayDto) {
    const event = await this.eventRepository.findOne(createDisplayDto.event);
    const display = new Display();
    display.event = Promise.resolve(event);
    return await this.displayRepository.save(display);
  }

  //Return all displays of event
  async findAll(eventId: string) {
    return await this.displayRepository.find({
      relations: ["event"],
      where: `Display.event = ${eventId}`,
    });
  }

  async findOne(id: number) {
    const display = await this.displayRepository.findOne(id);
    if (display) return display;
    else throw new NotFoundException(`Cannot find display with id ${id}`);
  }

  //@WARNING attach playlist to display - just one option
  async update(id: number, updateDisplayDto: UpdateDisplayDto) {
    const playlist = await this.playlistRepository.findOne(
      +updateDisplayDto.playlist
    );
    const display = await this.displayRepository.findOne(id);
    display.playlist = playlist;
    return this.displayRepository.save(display);
  }

  async remove(id: number) {
    const res = await this.displayRepository.delete(id);
    if (res.affected) return true;
    else return false;
  }
}
