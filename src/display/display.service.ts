import { forwardRef, Inject, Injectable } from "@nestjs/common";
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
    @Inject(forwardRef(() => EventService))
    private eventService: EventService,
    private playlistService: PlaylistService
  ) {}

  async create(dto: CreateDisplayDto): Promise<Display> {
    const display = new Display();
    display.author = this.userService.findOneById(dto.authorId).finally();
    display.event = this.eventService.findOne(+dto.eventId);
    await display.author;
    await display.event;
    return this.displayRepository.save(display);
  }

  async findAll(): Promise<Display[]> {
    return await this.displayRepository.find({
      relations: ["event", "author", "playlist"],
    });
  }

  async findOne(id: number): Promise<Display> {
    const display = await this.displayRepository.findOne(id, {
      relations: ["event", "author", "playlist"],
    });
    return display;
  }

  async update(id: number, dto: UpdateDisplayDto): Promise<void> {
    const display = await this.findOne(id);
    display.event = this.eventService.findOne(+dto.eventId);
    await display.event;
    this.displayRepository.save(display);
  }

  async remove(id: number): Promise<void> {
    await this.displayRepository.delete(id);
  }

  async attachPlaylist(id: string, playlistId: string): Promise<void> {
    const playlist = await this.playlistService.getPlaylistByDisplayId(id);
    if (playlist)
      await this.playlistService.deleteDisplayFromPlaylist(playlist.id);
    this.playlistService.attachDisplay(playlistId, id);
  }
}
