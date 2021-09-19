import { Display } from "src/display/entities/display.entity";
import {
  Entity,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ContentToPlaylist } from "./content-to-playlist.entity";

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn("uuid") id: string;

  @OneToOne(() => Display, (display) => display.playlist)
  display: Display;

  @OneToMany(
    () => ContentToPlaylist,
    (contentToPlaylist) => contentToPlaylist.playlist,
    {
      eager: true,
    }
  )
  @JoinTable()
  contentToPlaylist: ContentToPlaylist[];
}
