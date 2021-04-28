import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseInterceptors } from '@nestjs/common';
import { response } from 'express';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { AppService } from './app.service';
import { User } from './entity/user.entity';
import { NotFoundInterceptor } from './not-found.interceptor';


@Controller('users')
@UseInterceptors(NotFoundInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) { }


  @Get(':id')
   getOne(@Param('id') id: number) {
    const data =  this.appService.getOneById(id)

      .then(response => {
        console.log("the responsee in then is.....", response)
        return response
      })

      .catch(response => {
        // console.log("the response in catch is...........", response)
        // throw null

        throw response
      })

    console.log("the data is.........", data)
    return data

  }



  @Post()
  async create(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('phone') phone: number,
    @Body('dob') dob: any,

  ): Promise<User> {
    console.log("the received data in post request create funcations are")
    console.log(name, email, phone, dob);

    const dataa= await this.appService.createUser(name, email, phone, dob)
          .then(res => {
            console.log("response in then  statement of post is",res)
            return res
          })
          .catch(res => {
            //console.log("response in catch stmmt of post is ::",res)
            //return res
            throw res
          })

          return dataa;

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
  deleteuser(@Query('id') id: number) {
    return this.appService.deleteUser(id);

  }

}
