import { IsNumber, IsNumberString } from "class-validator";
import { Content } from "src/content/entities/content.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Playlist } from "./playlist.entity";

@Entity()
export class ContentToPlaylist {
  @PrimaryGeneratedColumn() id: string;

  @ManyToOne(() => Playlist, (playlist) => playlist.contentToPlaylist, {
    cascade: ["insert", "update"],
    lazy: true,
  })
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
