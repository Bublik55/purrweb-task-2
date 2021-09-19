import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: "User`s name",
    example: "Bob",
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string = null;

  @ApiProperty({
    description: "User`s email",
    example: "Bob@mail.com",
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string = null;

  @ApiProperty({
    description: "User`s password",
    example: "Bob@awesomeEncrypted",
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  password: string = null;
}
