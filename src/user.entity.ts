import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {  IsAlpha, IsEmail, IsNotEmpty, Length} from "class-validator";

@Entity("usersa")
export class User{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    @Length(3, 50)
    @IsNotEmpty()
    @IsAlpha()
    name:string

    @Column()
    @IsEmail()
    email:string

    @Column()
    phone:number

    @Column()
    dateofbirth: string
}