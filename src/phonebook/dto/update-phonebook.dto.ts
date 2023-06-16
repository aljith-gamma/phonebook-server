import { PartialType } from '@nestjs/mapped-types';
import { CreatePhonebookDto } from './create-phonebook.dto';

export class UpdatePhonebookDto extends PartialType(CreatePhonebookDto) {}
