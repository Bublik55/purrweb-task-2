import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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
    private contentToPlayListRepository: Repository<ContentToPlaylist>
  ) {}

  async create(dto: CreatePlaylistDto): Promise<Playlist> {
    console.log(dto);
    return await this.playlistRepository.save(dto);
  }

  findAll(): Promise<Playlist[]> {
    return this.playlistRepository.find();
  }

  findOne(id: number): Promise<Playlist> {
    return this.playlistRepository.findOne(id);
  }

  async update(id: number, dto: UpdatePlaylistDto) {
    return this.playlistRepository.update(id, dto);
  }

  async remove(id: number): Promise<void> {
    await this.playlistRepository.delete(id);
  }
  /**** */
  async updateContentToPlaylist(
    id: string,
    dto: UpdateContentToPlaylistDto
  ): Promise<void> {
    const playlist: Playlist = await this.playlistRepository.findOne(id);
    await this.flexPlaylist(dto, playlist);
  }

  async getContentToPlaylistById(id: string): Promise<ContentToPlaylist> {
    return await this.contentToPlayListRepository.findOne(+id);
  }

  async attachDisplay(id, displayId): Promise<void> {
    console.log(id, displayId);
    this.playlistRepository.update(id, { displayId: displayId });
  }

  async deleteDisplayFromPlaylist(id): Promise<void> {
    await this.playlistRepository.update({ id: id }, { display: null });
  }

  async getPlaylistByDisplayId(id): Promise<Playlist> {
    return this.playlistRepository.findOne({ where: { displayId: id } });
  }

  private async flexPlaylist(
    dto: UpdateContentToPlaylistDto,
    playlist: Playlist
  ): Promise<void> {
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
      });
      this.contentToPlayListRepository.update(ctp.id, ctp);
    }
  }
}
