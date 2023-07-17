import {IsEmail, IsNotEmpty, IsNumber, IsString,  Matches,  isNumber} from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class ManagementDTO{
    //@IsNumber()
   // @IsNotEmpty()
   @PrimaryGeneratedColumn()
    id:number;
   
    firstname: string;

    lastname: string;

    @IsEmail({},{message:"Please enterproper email."})
    email: string;
    
   
    password: string;
    phone:number;
    image:string

}

export class ManagementLoginDTO {
    @IsEmail({}, { message: "Please enter proper email" })
   email: string;
   password: string;
}

/*
export class StudentUpdateDTO{
    @IsNumber()
    @IsNotEmpty()
    id:number;
    @IsString({message:"Please enter proper name."})
    
    name: string;

    @IsEmail({},{message:"Please enterproper email."})
    email: string;
    @IsString({message:"Please enter Strong Password."})
    password: string;
    @IsString({message:"please enter proper department."})
    department: string;
}
*/
export class FacultyUpdateDTO{
    @IsNumber()
    @IsNotEmpty()
    id:number;
    @IsNotEmpty()
    @IsString({message:"Please enter proper name."})
    name: string;

    @IsEmail({},{message:"Please enterproper email."})
    email: string;
    @IsString({message:"Please enter Strong Password."})
    password: string;
    @IsString({message:"please enter proper department."})
    department: string;
    @IsString({message:"Please enter department"})
    position: string;
}


export class StudentDTO{




    @IsString({message:"invalid name"})

    @Matches( /^[a-zA-Z]+$/, {message:"enter a proper name"})

     name: string;

 

   @IsEmail({})

     email: string;

     password: string;

 

   }

   



export class StudentUpdateDTO{



   @PrimaryGeneratedColumn()
    id:number;

    fname: string;
    lname: string;

     email: string;

     department: string;
     image: string;




 }


 export class FacultUpdateDTO{



  @PrimaryGeneratedColumn()
    id:number;

    name: string;

     email: string;
     department: string;
     position: string;
     image: string;




 }