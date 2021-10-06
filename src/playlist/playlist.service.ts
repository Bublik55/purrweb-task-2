import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Content } from "src/content/entities/content.entity";
import { Display } from "src/display/entities/display.entity";
import { Repository } from "typeorm";
import { ContentToPlaylistDto } from "./dto/content-to-playlist.dto";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";
import { ContentToPlaylist } from "./entities/content-to-playlist.entity";
import { Playlist } from "./entities/playlist.entity";

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Display)
    private displayRepository: Repository<Display>,
    @InjectRepository(ContentToPlaylist)
    private contentToPlayListRepository: Repository<ContentToPlaylist>,
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>,
    @InjectRepository(Content)
    private contentRepository: Repository<Content>
  ) {}

  async create(dto: CreatePlaylistDto) {
    return await this.playlistRepository.save(dto);
  }

  findAll() {
    return this.playlistRepository.find({ relations: ["contentToPlaylist"] });
  }

  findOne(id: number) {
    return this.playlistRepository.findOne(id);
  }

  async update(id: number, dto: UpdatePlaylistDto) {
    return this.playlistRepository.update(id, dto);
  }

  remove(id: number) {
    return `This action removes a #${id} playlist`;
  }

  async ContentToPlayistFromDto(
    dto: ContentToPlaylistDto,
    playlistId: string
  ): Promise<ContentToPlaylist> {
    const ret = new ContentToPlaylist();
    this.validateContentToPlaylistDto(dto).catch();
    ret.order = dto.order;
    ret.duration = dto.duration;
    ret.contentId = dto.contentId;
    ret.playlistId = playlistId;
    ret.content = await this.contentRepository.findOne(dto.contentId);
    return this.contentToPlayListRepository.save(ret);
  }

  /**** */
  checkOrder(dto: ContentToPlaylistDto[]) {
    const max = dto.length;
    const orders: number[] = [];
    dto.forEach((element) => {
      orders.push(Number(element.order));
    });
    if (
      max !=
      orders.reduce((a, b) => {
        return a > b ? a : b;
      })
    )
      throw new BadRequestException("Bad order");
  }

  async validateContentToPlaylistDto(dto: ContentToPlaylistDto) {
    const ret = await this.contentRepository.findOne(dto.contentId);
    if (ret) return ret;
    else
      throw new NotFoundException(
        `Content with id = ${dto.contentId} don't exist`
      );
  }
}
