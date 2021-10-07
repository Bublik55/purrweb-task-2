import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DisplayService } from "src/display/display.service";
import { Repository } from "typeorm";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { UpdateContentToPlaylistDto } from "./dto/update-contentToPlaylist.dto";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";
import { ContentToPlaylist } from "./entities/content-to-playlist.entity";
import { Playlist } from "./entities/playlist.entity";

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>,
    @InjectRepository(ContentToPlaylist)
    private contentToPlayListRepository: Repository<ContentToPlaylist>,
    @Inject(forwardRef(() => DisplayService))
    private displayService: DisplayService
  ) {}

  async create(dto: CreatePlaylistDto) {
    return await this.playlistRepository.save(dto);
  }

  findAll() {
    return this.playlistRepository.find();
  }

  findOne(id: number) {
    return this.playlistRepository.findOne(id);
  }

  async update(id: number, dto: UpdatePlaylistDto) {
    return this.playlistRepository.update(id, dto);
  }

  remove(id: number) {
    return this.playlistRepository.delete(id);
  }
  /**** */
  async updateContentToPlaylist(id, dto: UpdateContentToPlaylistDto) {
    const playlist: Playlist = await this.playlistRepository.findOne(id);
    await this.flexPlaylist(dto, playlist);
  }

  async atttachPlaylist(id: string, displayId: string) {
    const playlist = await this.findOne(+id);
    const display = await this.displayService.findOne(+displayId);
    if (display.playlist) {
      const pl = await display.playlist;
      pl.display = null;
      this.playlistRepository.save(pl);
    }
    playlist.display = display;
    this.playlistRepository.save(playlist);
  }

  async getContentToPlaylistById(id: string) {
    return await this.contentToPlayListRepository.findOne(+id);
  }

  private async flexPlaylist(
    dto: UpdateContentToPlaylistDto,
    playlist: Playlist
  ) {
    const ctp = await this.contentToPlayListRepository.findOne(
      dto.contentToPlaylistId
    );
    if (dto.duration) ctp.duration = dto.duration;
    if (dto.order) {
      const oldOrder = +ctp.order;
      const newOrder = +dto.order;
      ctp.order = dto.order;
      playlist.contentToPlaylist.map((cur) => {
        if (newOrder < oldOrder)
          if (+cur.order >= newOrder && +cur.order < oldOrder) {
            cur.order = String(+cur.order + 1);
          }
        if (newOrder > oldOrder) {
          if (+cur.order <= newOrder && +cur.order > oldOrder) {
            cur.order = String(+cur.order - 1);
          }
        }
        this.contentToPlayListRepository.update(cur.id, cur);
        return cur;
      });
      this.contentToPlayListRepository.update(ctp.id, ctp);
    }
  }
}
