import { Label } from "@prisma/client"
import { IsEnum, IsNotEmpty, IsNumberString, IsString, Length } from "class-validator"

export class CreatePhonebookDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    @IsNumberString()
    @Length(10, 10)
    phone: string  

    @IsNotEmpty()
    @IsEnum(Label)
    label: Label
}
