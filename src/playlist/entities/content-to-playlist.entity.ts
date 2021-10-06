import { Content } from "src/content/entities/content.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Playlist } from "./playlist.entity";

@Entity()
export class ContentToPlaylist {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  playlistId: string;

  @Column()
  contentId: string;

  @ManyToOne(() => Playlist, (playlist) => playlist.contentToPlaylist, {
    onDelete: "CASCADE",
  })
  playlist: Promise<Playlist>;

  @ManyToOne(() => Content, (content) => content.contentToPlaylist, {
    eager: true,
    onDelete: "CASCADE",
  })
  content: Content;

  @Column("real")
  duration: string;

  @Column()
  order: string;
}
