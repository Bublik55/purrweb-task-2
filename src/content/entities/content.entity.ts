import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Playlist } from "src/playlist/entities/playlist.entity";
import { ContentToPlaylist } from "src/playlist/entities/content-to-playlist.entity";
import { Column, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

export enum CONTENT_TYPE {
	PICTURE,
	HTML,
	VIDEO,
	AUDIO,
}

export class Content {

	@PrimaryGeneratedColumn('uuid')id: string;

	@ApiProperty({
		description: 'Order in playlist',
		type: Number,
		example: 1
	})
	order: number;

	@ApiProperty({
		description: `Type of content`,
		type: CONTENT_TYPE,
		example: CONTENT_TYPE.PICTURE
	})
	contentType: CONTENT_TYPE;

	@ApiProperty({
		description: 'URL Path to content/rsc',
		type: String,
		example: "RANDOMURL"
	})
	@IsString()
	@Column('text') url: string;

//@TODO FIX IT
	// @ApiProperty({
	// 	description: "Playlists which contain current content/src"
	// })
	// @ManyToMany(() => ContentToPlaylist, playlist =>playlist.content)
	// playlists: ContentToPlaylist;
}
