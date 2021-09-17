import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsUUID } from "class-validator";
import { randomUUID } from "crypto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "src/event/entities/event.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";


@Entity()
export class User {
    constructor(dto: CreateUserDto) {
        this.id = String(randomUUID);
        this.name = dto.name;
        this.email = dto.email;
        this.password = dto.password;
    }

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
    @IsEmail()
    @Column('text') email: string;

    @ApiProperty({
        description: "User's events",
        example: Event,
        type: Event
    })
    @OneToMany(() => Event, events => events.user)
    events: Event[]

}
