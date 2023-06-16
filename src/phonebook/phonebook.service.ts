import { Injectable } from '@nestjs/common';
import { CreatePhonebookDto } from './dto/create-phonebook.dto';
import { UpdatePhonebookDto } from './dto/update-phonebook.dto';
import { User } from '@prisma/client';

@Injectable()
export class PhonebookService {
  create(createPhonebookDto: CreatePhonebookDto, user: User) {
    return user;
  }

  findAll() {
    return `This action returns all phonebook`;
  }

  findOne(id: number) {
    return `This action returns a #${id} phonebook`;
  }

  update(id: number, updatePhonebookDto: UpdatePhonebookDto) {
    return `This action updates a #${id} phonebook`;
  }

  remove(id: number) {
    return `This action removes a #${id} phonebook`;
  }
}
