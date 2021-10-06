import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDto {
  @IsString()
  @ApiProperty({
    description: "Username",
    example: "Bob",
  })
  readonly username: string;

  @IsString()
  @ApiProperty({
    description: "Password",
    example: "Bobbby",
  })
  readonly password: string;
}
