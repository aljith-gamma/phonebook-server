import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";


export class CreateSigninDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;    

    @IsNotEmpty()
    @IsString()
    password: string;
}