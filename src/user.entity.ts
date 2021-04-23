import { Column, Double, Entity, IsNull, PrimaryGeneratedColumn } from "typeorm";
import {  IsAlpha, IsDate, IsEmail, isInt, IsInt, IsNotEmpty, isNumber, IsPhoneNumber, IS_PHONE_NUMBER, Length, Min} from "class-validator";

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