import { Content } from 'src/content/entities/content.entity';
import { Display } from 'src/display/entities/display.entity';
import { Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ContentToPlaylist } from './content-to-playlist.entity';

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn('uuid') id: string;

  @OneToOne(() => Display, (display) => display.playlist)
  display: Display;

  @ManyToMany(() => ContentToPlaylist, (units) => units.playlist)
  units: ContentToPlaylist[];
}
