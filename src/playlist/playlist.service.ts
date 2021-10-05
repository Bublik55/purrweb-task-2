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
import { dataToUpdate, UpdatePlaylistDto } from "./dto/update-playlist.dto";
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

  async create(createPlaylistDto: CreatePlaylistDto) {
    let ret: Promise<Playlist>;
    let playlist = await new Playlist();
    let display: Display;
    playlist.authorId = createPlaylistDto.authorId;
    this.checkOrder(createPlaylistDto.content);
    try {
      display = await this.displayRepository.findOneOrFail(
        +createPlaylistDto.displayId
      );
    } catch (err) {
      throw new NotFoundException(
        `Cant find display to attach with id ${createPlaylistDto.displayId}`
      );
    }
    if (display.playlist) {
      throw new BadRequestException("Current Display already has Playlist");
    }
    playlist.display = Promise.resolve(display);
    playlist = await this.playlistRepository.save(playlist);
    playlist.contentToPlaylist = [];
    this.displayRepository.save(display);

    createPlaylistDto.content.forEach((element) => {
      ret = this.ContentToPlayistFromDto(element, playlist.id)
        .then((element) => {
          playlist.contentToPlaylist.push(element);
          return this.playlistRepository.save(playlist);
        })
        .catch((err) => {
          throw new NotFoundException(
            err + `Can't find Content with id = ${element.contentID}`
          );
        });
    });

    return ret;
  }

  findAll() {
    return this.playlistRepository.find({ relations: ["contentToPlaylist"] });
  }

  findOne(id: number) {
    return this.playlistRepository.findOne(id);
  }

  async update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    let ret: Promise<Playlist>;
    const playlist: Playlist = await this.playlistRepository.findOne(id);
    updatePlaylistDto.data.forEach((elem) => {
      ret = this.flexPlaylist(elem, playlist);
    });
    return ret;
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
    ret.contentId = dto.contentID;
    ret.playlistId = playlistId;
    ret.content = await this.contentRepository.findOne(dto.contentID);
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
    const ret = await this.contentRepository.findOne(dto.contentID);
    if (ret) return ret;
    else
      throw new NotFoundException(
        `Content with id = ${dto.contentID} don't exist`
      );
  }

  async flexPlaylist(dataToUpdate: dataToUpdate, playlist: Playlist) {
    const ctp = await this.contentToPlayListRepository.findOne(
      dataToUpdate.contentToPlaylistId
    );

    if (dataToUpdate.newOrder) {
      ctp.order = dataToUpdate.newOrder;
      const oldOrder = ctp.order;
      const newOrder = dataToUpdate.newOrder;
      playlist.contentToPlaylist.map((cur) => {
        if (newOrder < oldOrder)
          if (
            Number(cur.order) >= Number(newOrder) &&
            Number(cur.order) < Number(oldOrder)
          ) {
            cur.order = String(Number(cur.order) + 1);
          } else if (newOrder > oldOrder) {
            if (
              /** */
              Number(cur.order) <= Number(newOrder) &&
              Number(cur.order) > Number(oldOrder)
            ) {
              cur.order = String(Number(cur.order) - 1);
            }
          }
      });
    }
    if (dataToUpdate.newDuration) ctp.duration = dataToUpdate.newDuration;

    const ret = await this.playlistRepository.save(playlist);
    await this.contentToPlayListRepository.save(ctp);
    return ret;
  }
}
