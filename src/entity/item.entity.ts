import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {  IsAlpha, IsEmail, IsNotEmpty, Length} from "class-validator";
import { User } from "./user.entity";

@Entity()
export class Items{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    @Length(3, 50)
    @IsNotEmpty()
    @IsAlpha()
    name:string

    @Column()
    price: number


    @ManyToOne(type=> User, user => user.item)
    user: User

}