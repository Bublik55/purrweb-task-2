import { IsNumberString } from "class-validator";
import { Content } from "src/content/entities/content.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Playlist } from "./playlist.entity";

@Entity()
export class ContentToPlaylist {
  @PrimaryGeneratedColumn() id: string;

  @Column()
  playlistId: string;

  @Column()
  contentId: string;

  @ManyToOne(() => Playlist, (playlist) => playlist.contentToPlaylist)
  playlist: Promise<Playlist>;

  @ManyToOne(() => Content, (content) => content.contentToPlaylist)
  content: Content;

  @IsNumberString()
  @Column()
  duration: string;
  @IsNumberString()
  @Column()
  order: string;
}
