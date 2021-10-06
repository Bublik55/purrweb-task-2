import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ContentToPlaylistDto } from "./dto/content-to-playlist.dto";
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

  async updateContentToPlaylist(id, dto: UpdateContentToPlaylistDto) {
    const playlist: Playlist = await this.playlistRepository.findOne(id);
    await this.flexPlaylist(dto, playlist);
    //  return this.playlistRepository.save(playlist);
  }

  async flexPlaylist(dto: UpdateContentToPlaylistDto, playlist: Playlist) {
    const ctp = await this.contentToPlayListRepository.findOne(
      dto.contentToPlaylistId
    );
    if (dto.duration) ctp.duration = dto.duration;
    if (dto.order) {
      const oldOrder = +ctp.order;
      const newOrder = +dto.order;
      console.log(oldOrder, newOrder);

      ctp.order = dto.order;
      playlist.contentToPlaylist.map((cur) => {
        if (newOrder < oldOrder)
          if (+cur.order >= newOrder && +cur.order < oldOrder) {
            cur.order = String(+cur.order + 1);
            console.log("          33333333332");
          }
        if (newOrder > oldOrder) {
          if (+cur.order <= newOrder && +cur.order > oldOrder) {
            cur.order = String(+cur.order - 1);
            console.log("          22222222");
          }
        }
        this.contentToPlayListRepository.save(cur);
        console.log(cur.order);
        return cur;
      });
      this.contentToPlayListRepository.save(ctp);
    }
  }
}
