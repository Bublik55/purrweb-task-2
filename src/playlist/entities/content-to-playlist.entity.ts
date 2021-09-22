import { IsNumberString } from "class-validator";
import { Content } from "src/content/entities/content.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Playlist } from "./playlist.entity";

@Entity()
export class ContentToPlaylist {
  @PrimaryGeneratedColumn() id: string;

  @Column()
  @IsNumberString()
  playlistId: string;

  @Column()
  @IsNumberString()
  contentId: string;

  @ManyToOne(() => Playlist, (playlist) => playlist.contentToPlaylist, {
    onDelete: "CASCADE",
  })
  playlist: Promise<Playlist>;

  @ManyToOne(() => Content, (content) => content.contentToPlaylist, {
    eager: true,
  })
  @JoinColumn()
  content: Content;

  @IsNumberString()
  @Column("real")
  duration: string;
  @IsNumberString()
  @Column()
  order: string;
}
