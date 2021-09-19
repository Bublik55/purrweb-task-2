import { IsNumber } from 'class-validator';
import { Content } from 'src/content/entities/content.entity';
import { Display } from 'src/display/entities/display.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Playlist } from './playlist.entity';

@Entity()
export class ContentToPlaylist {
  @PrimaryGeneratedColumn('uuid') id: string;

	@ManyToMany(()=> Playlist, playlist => playlist.contentToPlaylist)
	playlist: Playlist;

  @ManyToOne(() => Content, content => content.contentToPlaylist)
  content: Content;


  @OneToOne(() => Display, (display) => display.playlist)
  display: Display;

	@IsNumber()
  @Column()
	order: number;




}
