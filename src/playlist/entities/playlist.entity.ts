import { Content } from 'src/content/entities/content.entity';
import { Display } from 'src/display/entities/display.entity';
import { Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn('uuid') id: string;

  @OneToOne(() => Display, (display) => display.playlist)
  display: Display;

  @ManyToMany(() => Content, (content) => content.playlists)
  content: Map<number,Content>;
}
