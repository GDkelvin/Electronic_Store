import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @Matches(/(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])/, {
        message:
          'Password must include at least one uppercase letter, one number, and one special character',
      })
    password: string
}
