import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile, Query, ParseIntPipe } from '@nestjs/common';
import { PhonebookService } from './phonebook.service';
import { CreatePhonebookDto } from './dto/create-phonebook.dto';
import { UpdatePhonebookDto } from './dto/update-phonebook.dto';
import { AuthGuard } from 'src/guards/auth.guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';
import { diskStorage } from 'multer';
 
const fileConfig = {
  destination: './files/avatar',
  filename: (req, file, cb) => {
    const uniqueSuffix = uuid();
    const fileExt = extname(file.originalname);
    const fileName = uniqueSuffix + fileExt;
    cb(null, fileName);
  }
}

@Controller('phonebook')
@UseGuards(AuthGuard )
export class PhonebookController {
  constructor(private readonly phonebookService: PhonebookService) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage(fileConfig)
    })
  )
  create(
    @Body() createPhonebookDto: CreatePhonebookDto,
    @Req() { user },
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return this.phonebookService.create(createPhonebookDto, user, avatar);
  }

  @Get()
  findAll(
    @Req() { user },
    @Query('skip', ParseIntPipe) skip: number
  ) {
    return this.phonebookService.findAll( user, skip );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phonebookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhonebookDto: UpdatePhonebookDto) {
    return this.phonebookService.update(+id, updatePhonebookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phonebookService.remove(+id);
  }
}
