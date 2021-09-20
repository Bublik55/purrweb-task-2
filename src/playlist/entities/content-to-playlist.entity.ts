import { IsNumber } from "class-validator";
import { Content } from "src/content/entities/content.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Playlist } from "./playlist.entity";

@Entity()
export class ContentToPlaylist {
  @PrimaryGeneratedColumn() id: string;

  @ManyToOne(() => Playlist, (playlist) => playlist.contentToPlaylist, {
    onDelete: "CASCADE",
  })
  playlist: Playlist;

  @ManyToOne(() => Content, (content) => content.contentToPlaylist, {
    onDelete: "CASCADE",
  })
  content: Content;

  @IsNumber()
  @Column()
  duration: number;
  @IsNumber()
  @Column()
  order: number;
}
