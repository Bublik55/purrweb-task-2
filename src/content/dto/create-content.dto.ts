import { ApiProperty } from "@nestjs/swagger";
import { CONTENT_TYPE } from "../entities/content.entity";


export class CreateContentDto {

	contentType: CONTENT_TYPE;

	url: string;
}
