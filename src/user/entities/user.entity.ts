import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsUUID } from "class-validator";
import { randomUUID } from "crypto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "src/event/entities/event.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";


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
    @Column('text') name: string = "sss";

    @ApiProperty({
        description: "HASHED User's password",
        example: "Awesomepasswd",
        type: String
    })
    @IsString()
    @Column('text') password: string = "def";

    @ApiProperty({
        description: "User's email",
        example: " Awesome@some.me",
        type: String
    })
    @IsEmail()
    @Column('text') email: string = "ss";

    @ApiProperty({
        description: "User's events",
        example: Event,
        type: Event
    })
    @OneToMany(() => Event, events => events.user)
    events: Event[]

}
