import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EventService } from "src/event/event.service";
import { PlaylistService } from "src/playlist/playlist.service";
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
    private playlistService: PlaylistService,
    private eventService: EventService
  ) {}

  async create(dto: CreateDisplayDto) {
    const display = new Display();
    display.author = await this.userService.findOneById(dto.authorId);
    display.event = await this.eventService.findOne(+dto.eventId);
    display.playlist = await this.playlistService.findOne(+dto.playlistId);
    return await this.displayRepository.save(display);
  }

  async findAll() {
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
    const playlist = await this.playlistService.findOne(+dto.playlistId);
    display.playlist = playlist;
    // REVU: Валидировать это в пайпах. Позволить перепривязывать плейлисты к дисплеям
    return this.displayRepository.update(id, display);
  }

  async remove(id: number) {
    const res = await this.displayRepository.delete(id);
    if (res.affected) return true;
    else return false;
  }
}
