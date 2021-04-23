import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AppService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {

  }

  getAll(): Promise<User[]> {
    return this.userRepository.find()
  }


  async getOneById(id: number): Promise< User > {
    var user1;
    try {
       
      if (id)
      {
      user1 =await this.userRepository.findOneOrFail(id)
      }
      else {
      console.log( "id is invalid");
      }
     return   await user1;
    }
    catch (err) {
      console.log("error is " + err);
      return (err)
    }

  }

  async createUser(name: string, email: string, phone: number, dateofbirth: any): Promise<User> {

    


    const newUser = await this.userRepository.create({ name, email, phone, dateofbirth });


    const errors = await validate(newUser);
    if (errors.length > 0) {
      throw new Error(`Validation failed! in create user ${errors}`);
    } else {
    
      return this.userRepository.save(newUser);
    }



  }

  async updateUser(id: number, name?: string, email?: string,phone?:number, dob?: string): Promise<User> {
    const user = await this.getOneById(id);
    user.name = name || user.name;
    user.email = email || user.email;
    user.dateofbirth = dob || user.dateofbirth;
    user.phone  = phone||  user.phone;
    return this.userRepository.save(user);

  }

  async deleteUser(id: number): Promise<User> {
    const duser = await this.getOneById(id);
    return this.userRepository.remove(duser);
  }


  getHello(): string {
    return 'Hello World!';
  }
}
