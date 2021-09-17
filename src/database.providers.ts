import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user/entities/user.entity';
import { Playlist } from './playlist/entities/playlist.entity';
import { Event } from './event/entities/event.entity';
import { ContentToPlaylist } from './playlist/entities/content-to-playlist.entity';
import { Content } from './content/entities/content.entity';
import { Display } from './display/entities/display.entity';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.18.0.1', 
      port: 5432,
      username: 'postgres',
      password:  'postgres',
      database:  'postgres',
			entities: [User ,Playlist, Event, ContentToPlaylist, Content, Display],
      synchronize: true,
    }),
    UserModule
  ],
})
export class DataBaseModule {}
