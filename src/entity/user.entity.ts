import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {  IsAlpha, IsEmail, IsNotEmpty, Length} from "class-validator";
 
import { Items } from "./item.entity";

@Entity("usersa")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @IsNotEmpty()
    @IsAlpha()
    name:string;

    @Column()
    @IsEmail()
    email:string;

    @Column()
    phone:number;

    @Column()
    dateofbirth: string;

    @OneToMany(type => Items, item => item.user)
    item: Items[];

    static findByName(Name: string) {
        return this.createQueryBuilder("user")
            .where("user.name = :Name", { Name })
            .getOne();


    }









}