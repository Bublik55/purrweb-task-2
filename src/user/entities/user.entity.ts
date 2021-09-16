import { ApiProperty } from "@nestjs/swagger";
import { IsEAN, IsString, IsUUID } from "class-validator";
import { randomUUID } from "crypto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "src/event/entities/event.entity";


@Entity()
export class User {

    @ApiProperty({
        example: randomUUID,
        type: String
    })
    @IsUUID()
    @PrimaryGeneratedColumn('uuid') id: string;

    @ApiProperty({
        description: 'User`s name',
        example: 'Bob',
        type: String
    })
    @IsString()
    @Column('text') name: string;

    @ApiProperty({
        description: "HASHED User's password",
        example: "Awesomepasswd",
        type: String
    })
    @IsString()
    @Column('text') password: string;

    @ApiProperty({
        description: "User's email",
        example: " Awesome@some.me",
        type: String
    })
    @IsEAN()
    @Column('text') email: string;

    @ApiProperty({
        description: "User's events",
        example: Event,
        type: Event
    })
    @OneToMany(() => Event, events => events.user)
    events: Event[]

}
