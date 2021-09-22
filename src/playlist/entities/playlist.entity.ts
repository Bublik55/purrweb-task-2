import { Display } from "src/display/entities/display.entity";
import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ContentToPlaylist } from "./content-to-playlist.entity";

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn() id: string;

  @OneToOne(() => Display, (display) => display.playlist, {
    onDelete: "CASCADE",
  })
  display: Display;

  @OneToMany(
    () => ContentToPlaylist,
    (contentToPlaylist) => contentToPlaylist.playlist,
    {
      eager: true,
      cascade: true,
      onDelete: "CASCADE",
    }
  )
  @JoinColumn()
  contentToPlaylist: ContentToPlaylist[];
}
