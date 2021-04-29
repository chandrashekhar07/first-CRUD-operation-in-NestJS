import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './entity/user.entity';



@Controller('users')

export class AppController {
  constructor(private readonly appService: AppService) { }


  @Get(':id')
  async getOne(@Param('id') id: number) {
    const data = await this.appService.getOneById(id)

      .then(response => {
        console.log("the responsee in then is.....", response)
        return response
      })

      .catch(response => {

        throw response
      })

     
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

    const dataa = await this.appService.createUser(name, email, phone, dob)
      .then(res => {
        console.log("response in then  statement of post is", res)
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
  getDocs(): Promise<User[] | User> {
   
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
    if (!id)
    throw new Error("you must provide id")
    return this.appService.updateUser(id, name, email, phone, dob)
  }


  @Delete(':id')
  deleteuser(@Param('id') id: number) {
    console.log("id is............",id)
    return this.appService.deleteUser(id);

  }





}
