import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PhonebookService } from './phonebook.service';
import { CreatePhonebookDto } from './dto/create-phonebook.dto';
import { UpdatePhonebookDto } from './dto/update-phonebook.dto';
import { AuthGuard } from 'src/guards/auth.guards';

@Controller('phonebook')
@UseGuards(AuthGuard )
export class PhonebookController {
  constructor(private readonly phonebookService: PhonebookService) {}

  @Post('create')
  create(
    @Body() createPhonebookDto: CreatePhonebookDto,
    @Req() { user }
  ) {
    return this.phonebookService.create(createPhonebookDto, user);
  }

  @Get()
  findAll() {
    return this.phonebookService.findAll();
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
