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
import { ContentToPlayistFromDto } from "./utills";

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
    let playlist = await new Playlist();
    let display: Display;
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
      // throw new BadRequestException("Current Display already has playlist");
    }
    let ret;
    playlist.display = display;
    playlist = await this.playlistRepository.save(playlist);
    playlist.contentToPlaylist = [];
    createPlaylistDto.content.forEach((element) => {
      this.validateContentToPlaylistDto(element);
      const contentToPlaylist = ContentToPlayistFromDto(element, playlist.id);
      ret = this.contentToPlayListRepository
        .save(contentToPlaylist)
        .then((element) => {
          playlist.contentToPlaylist.push(element);
          return this.playlistRepository.save(playlist);
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

  findOneByDisplay(displayid: number) {
    return this.playlistRepository.findOne({
      relations: ["contentToPlaylist", "content"],
      where: `Playlist.display = ${displayid}`,
    });
  }

  update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return updatePlaylistDto;
  }

  remove(id: number) {
    return `This action removes a #${id} playlist`;
  }

  async validateContentToPlaylistDto(dto: ContentToPlaylistDto) {
    try {
      return await this.contentRepository.findOneOrFail(dto.contentID);
    } catch (err) {
      console.log(err + "======================================");
      throw new NotFoundException(
        `Can't find Content with id = ${dto.contentID}`
      );
    }
  }
}
