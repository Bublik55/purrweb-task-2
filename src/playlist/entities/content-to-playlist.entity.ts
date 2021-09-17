import { IsNumber } from 'class-validator';
import { Content } from 'src/content/entities/content.entity';
import { Display } from 'src/display/entities/display.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Playlist } from './playlist.entity';

@Entity()
export class ContentToPlaylist {
  @PrimaryGeneratedColumn('uuid') id: string;

	@ManyToMany(()=> Playlist, playlist => playlist.units)
	playlist: Playlist;

  @OneToOne(() => Display, (display) => display.playlist)
  display: Display;

	@IsNumber()
  @Column()
	order: number;

  @ManyToOne(() => Content)
  contents: Content;
}
