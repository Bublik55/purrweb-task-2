import { PartialType } from '@nestjs/mapped-types';
import { IsNumberString } from 'class-validator';
import { CreateDisplayDto } from './create-display.dto';

export class UpdateDisplayDto extends CreateDisplayDto {
	@IsNumberString()
	event: string;

	@IsNumberString()
	playlist: string;
}
