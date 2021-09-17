import { Content } from 'src/content/entities/content.entity';
import { Display } from 'src/display/entities/display.entity';
import { Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PlaylistUnit } from './playlist.unit.entity';

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn('uuid') id: string;

  @OneToOne(() => Display, (display) => display.playlist)
  display: Display;

  @ManyToMany(() => PlaylistUnit, (units) => units.playlist)
  units: PlaylistUnit[];
}
