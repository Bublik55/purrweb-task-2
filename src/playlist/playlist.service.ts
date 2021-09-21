import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Content } from "src/content/entities/content.entity";
import { Display } from "src/display/entities/display.entity";
import { Repository } from "typeorm";
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

  async create(createPlaylistDto: CreatePlaylistDto) {
    let playlist = await new Playlist();
    playlist = await this.playlistRepository.save(playlist);
    playlist.display = await this.displayRepository.findOne(
      +createPlaylistDto.displayId
    );
    playlist.contentToPlaylist = [];
    createPlaylistDto.content.forEach(async (element) => {
      const contentToPlaylist = new ContentToPlaylist();
      contentToPlaylist.order = element.order;
      contentToPlaylist.duration = element.duration;
      contentToPlaylist.content = await this.contentRepository.findOne(
        element.contentID
      );
      contentToPlaylist.contentId = element.contentID;
      contentToPlaylist.playlistId = playlist.id;
      const resolved = await this.contentToPlayListRepository.save(
        contentToPlaylist
      );

      console.log(resolved);

      playlist.contentToPlaylist.push(resolved);
    });

    return await this.playlistRepository.save(playlist);
  }

  findAll() {
    return this.playlistRepository.find({ relations: ["content_to_playlist"] });
  }

  findOne(id: number) {
    return this.playlistRepository.findOne(id);
  }
  findOneByDisplay(displayid: number) {
    return this.playlistRepository.findOne({
      relations: ["display"],
      where: `Playlist.display = ${displayid}`,
    });
  }

  update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return updatePlaylistDto;
  }

  remove(id: number) {
    return `This action removes a #${id} playlist`;
  }
}
