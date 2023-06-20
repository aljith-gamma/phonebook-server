import { Injectable } from '@nestjs/common';
import { CreatePhonebookDto } from './dto/create-phonebook.dto';
import { UpdatePhonebookDto } from './dto/update-phonebook.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { normalize } from 'node:path';
import { ADDRGETNETWORKPARAMS } from 'node:dns';

@Injectable()
export class PhonebookService {

  constructor(private readonly prisma: PrismaService){};

  async createContact(createPhonebookDto: CreatePhonebookDto, user: User, file) {
      const avatarPath = file && normalize(`${__dirname}../../../files/avatar/${file.filename}`); 
      
      const isNameExist = await this.prisma.phonebook.findUnique({
        where: { name: createPhonebookDto.name}
      })

      if(isNameExist){
        return {
          status: false,
          message: 'Contact already exist with the same name!'
        }
      }

      const isNumberExist = await this.prisma.phonebook.findUnique({
        where: {
          phone: createPhonebookDto.phone
        }
      })

      if(isNumberExist){
        return {
          status: false,
          message: 'contact already exist!'
        }
      }

      const contact = await this.prisma.phonebook.create({
        data: {
          ...createPhonebookDto,
          ...( file &&  {avatar_url: avatarPath} ),
          user_id: user.id
        }
      })
      
      return {
        status: true,
        message: 'Contact saved successfully!'
      }
  }

  async updateContact(updatePhonebookDto: UpdatePhonebookDto, user: User, file, id){
    const { phone, name } = updatePhonebookDto;
    const avatarPath = file && normalize(`${__dirname}../../../files/avatar/${file.filename}`); 

    const contact = await this.prisma.phonebook.findFirst({
      where: { 
        id,
        user_id: user.id,
        isDeleted: false
      }
    })

    const isNameExist = await this.prisma.phonebook.findUnique({
      where: { name }
    })

    if(isNameExist && isNameExist.id !== id){
      return {
        status: false,
        message: "Name already exist!"
      }
    }

    const isPhoneExist = await this.prisma.phonebook.findUnique({
      where: { phone }       
    })

    if(isPhoneExist && isPhoneExist.id !== id){
      return {
        status: false,
        message: "Number already exist!"
      }
    }


    if(!contact){
      return {
        status: false,
        message: 'No such contact exist!'
      }
    }

    const updatedContact = await this.prisma.phonebook.update({
      where: { id },
      data: {
        ...updatePhonebookDto,
        ...(avatarPath && { avatar_url: avatarPath })
      }
    })


    return {
      status: true,
      message: 'Contact updated successfully!'
    };
  }

  async findAll(user: User, skip: number) {
    const {_count : count} = await this.prisma.phonebook.aggregate({
      where: {
        user_id: user.id
      },
      _count: true
  })
    
  const contacts = await this.prisma.phonebook.findMany({
    where: {
      user_id: user.id,
      isDeleted: false
    },
    select: {
      id: true,
      name: true,
      avatar_url: true,
      phone: true,
      address: true,
      label: true,
      isBookmarked: true
    },
    orderBy: {
      name: 'asc'
    },
    skip: skip,
    take: 10
  })

    
    return {
      status: true,
      data: contacts,
      count
    }
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
