import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Event } from "src/event/entities/event.entity";
import { Playlist } from "src/playlist/entities/playlist.entity";
import { User } from "src/user/entities/user.entity";
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
    private playlistRepository: Repository<Playlist>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createDisplayDto: CreateDisplayDto) {
    const event = await this.eventRepository.findOne(createDisplayDto.eventId);
    //throw exceptyion if event no exists
    const user = this.userRepository.findOne(createDisplayDto.userId);
    const display = new Display();
    display.event = Promise.resolve(event);
    display.authorId = (await Promise.resolve(user)).id;
    return await this.displayRepository.save(display);
  }

  //Return all displays of event
  async findAll() {
    return await this.displayRepository.find({
      relations: ["event", "author"],
    });
  }

  async findOne(id: number) {
    const display = await this.displayRepository.findOne(id, {
      relations: ["event", "author"],
    });
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
    return this.displayRepository.save(display).catch(() => {
      throw new BadRequestException("Playlist has attached to other display");
    });
  }

  async remove(id: number) {
    const res = await this.displayRepository.delete(id);
    if (res.affected) return true;
    else return false;
  }
}
