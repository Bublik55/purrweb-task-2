import { IsNumber } from "class-validator";
import { Content } from "src/content/entities/content.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Playlist } from "./playlist.entity";

@Entity()
export class ContentToPlaylist {
  @PrimaryGeneratedColumn("uuid") id: string;

  @ManyToOne(() => Playlist, (playlist) => playlist.contentToPlaylist)
  playlist: Playlist;

  @ManyToOne(() => Content, (content) => content.contentToPlaylist)
  content: Content;

  @IsNumber()
  @Column()
  order: number;
}
