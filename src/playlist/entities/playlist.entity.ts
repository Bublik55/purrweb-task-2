import { Display } from "src/display/entities/display.entity";
import { User } from "src/user/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ContentToPlaylist } from "./content-to-playlist.entity";

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User, {
    lazy: true,
    cascade: true,
  })
  @JoinColumn({ name: "authorId" })
  author: User;

  @OneToOne(() => Display, (display) => display.playlist, {
    lazy: true,
    cascade: true,
    onDelete: "SET NULL",
    nullable: true,
  })
  @JoinColumn({ name: "displayId" })
  display: Display;
  @OneToMany(
    () => ContentToPlaylist,
    (contentToPlaylist) => contentToPlaylist.playlist,
    {
      eager: true,
      onDelete: "NO ACTION",
      nullable: true,
      cascade: true,
    }
  )
  @JoinColumn()
  contentToPlaylist: ContentToPlaylist[];
}
