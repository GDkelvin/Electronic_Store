import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';
@Controller('user')
export class UserController {
  jwtService: any;
  constructor(private readonly userService: UserService) { }

  @Post('register')
  async register(@Body() dto: CreateUserDto): Promise<{ message: string; user: User }> {
    const user = await this.userService.registerUser(dto);
    return { message: 'Account created successfully', user };
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.userService.login(dto);
  }

  // @Post('login')
  // async login(@Body dto: LoginDto): Promise<{ message: string; token: any; }>{
  //   const user = await this.userService.findByEmail(dto.email);
  //   if(!user){
  //     throw new BadRequestException('Invalid email or password');
  //   }

  //   const passwordMatch = await bcrypt.compare(dto.password, user.password);
  //   if(!passwordMatch){
  //     throw new BadRequestException('Invalid email or password');
  //   }

  //   const token = this.jwtService.sign({userId: user.id});
  //   return {message: 'Login successfully', token};
  // }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
