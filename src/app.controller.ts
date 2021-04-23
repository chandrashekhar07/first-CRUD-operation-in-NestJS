import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user.entity';


@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) { }



  @Post()
  create(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('phone') phone: number,
    @Body('dob') dob: any,

  ): Promise<User> {

    console.log(name, email, phone, dob);
    return this.appService.createUser(name, email, phone, dob)
  }




  @Get()
  getDocs(@Query('id') id: number): Promise<User[] | User> {
    if (id)
      return this.appService.getOneById(id);
    else
      return this.appService.getAll();

  }



  @Put()
  update(
    @Body('id') id: number,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('phone') phone: number,
    @Body('dob') dob: any
  ) {
    console.log(id, name, email, phone, dob)
    return this.appService.updateUser(id, name, email, phone, dob)
  }


  @Delete()
  deleteuser(@Query('id') id: number){
    return this.appService.deleteUser(id);

  }

}
