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

  //@WARNING attach playlist to display - just one option
  async update(id: number, updateDisplayDto: UpdateDisplayDto) {
    // const playlist = await this.playlistRepository.findOne(
    //   +updateDisplayDto.playlistId
    // );
    // const display = await this.displayRepository.findOne(id);
    // display.playlist = playlist;
    // // REVU: Валидировать это в пайпах. Позволить перепривязывать плейлисты к дисплеям
    // return this.displayRepository.save(display).catch(() => {
    //   throw new BadRequestException("Playlist has attached to other display");
    // });
  }

  async remove(id: number) {
    const res = await this.displayRepository.delete(id);
    if (res.affected) return true;
    else return false;
  }
}
