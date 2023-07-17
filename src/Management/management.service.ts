import { Injectable,  } from "@nestjs/common";
import { FacultUpdateDTO, FacultyUpdateDTO, ManagementDTO, ManagementLoginDTO, StudentDTO, StudentUpdateDTO  } from "./management.dto";
import * as fs from 'fs';
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer/dist";
import * as nodemailer from 'nodemailer';
import { Repository } from "typeorm"

import { InjectRepository } from "@nestjs/typeorm";
import { ManagementEntity, ManagementProfile } from "./management.entity";
import { StudentEntity } from "src/Student/student.entity";
import { FacultyEntity } from "src/Faculty/faculty.entity";
import { LibraryEntity } from "src/ManageLibrary/libraryDetails.entity";


/*@Injectable()
export class ManagementService {
    addStudent(data:StudentUpdateDTO): string { 
        return data.id+","+data.name+","+data.email+","+data.password+","+data.department ;
    }


    addFaculty(data:FacultyUpdateDTO): string { 
        return data.id+","+data.name+","+data.email+","+data.password+","+data.department+","+data.position ;
    }
   
    getStudentIndex(): any{
        
        return( [
            { id: 1, name: 'Arnab Das' , email:"arnab@gmail.com",password:"arnab344",department: "cse"},
            { id: 2, name: 'Pranta' , email:"pranta@gmail.com",password:"pranta344",department: "cse"},
            { id: 3, name: 'Atanu Das', email:"atanu@gmail.com",password:"atanu344",department: "cse"},
          ]);
          
    }

    getFacultyIndex(): any{
        
        return( [
            { id: 1, name: 'Arnab Das' , email:"arnab@gmail.com",password:"arnab344",department: "cse",position:"lecturer"},
            { id: 2, name: 'Pranta' , email:"pranta@gmail.com",password:"pranta344",department: "cse",position:"lecturer"},
            { id: 3, name: 'Atanu Das', email:"atanu@gmail.com",password:"atanu344",department: "cse",position:"lecturer"},
          ]);
          
    }

    getStudentByID(id: number): any {
        if(id==1){
        return ({id:1, name:"Priyam", email:"priyam@gmail.com",password:"abc344"})
        } 
        else if (id==2){
            return ({id:2, name:"Priyam", email:"priyam@gmail.com",password:"abc344"})

        }
        else if (id==3){
            return ({id:3, name:"Priyam", email:"priyam@gmail.com",password:"abc344"})

        }
        else{
        return ("Enter a proper Id")
        }
    }
    getManagementByName(name: string): any {
       // return data.id+","+data.email+","+data.password;

        if(name=="Priyam"){
            return ({id:1, name:"Priyam", email:"priyam@gmail.com",password:"abc344"})
            } 
            else if (name=="abc"){
                return ({id:2, name:"abc", email:"priyam@gmail.com",password:"abc344"})
    
            }
            else if (name=="jon"){
                return ({id:3, name:"jon", email:"priyam@gmail.com",password:"abc344"})
    
            }
            else{
            return ("Enter proper name.")
            }

    }

    updateStudentById(id:number,data: StudentUpdateDTO): object
    {
console.log(id);
console.log(data);
        return data;
    }

    updateFacultyById(id:number,data: FacultyUpdateDTO): object
    {
console.log(id);
console.log(data);
        return data;
    }

    
}*/








@Injectable()

export class ManagementService {




  constructor(

  @InjectRepository(ManagementEntity)

  private managementRepo: Repository<ManagementEntity>,
  private readonly mailerService: MailerService,

  @InjectRepository(StudentEntity)

  private studentRepo: Repository<StudentEntity>,

  @InjectRepository(FacultyEntity)

  private facultyRepo: Repository<FacultyEntity>,

  @InjectRepository(LibraryEntity)

  private libraryRepo: Repository<LibraryEntity>,

  @InjectRepository(ManagementProfile)

  private profileRepo: Repository<ManagementProfile>,

) { }

async sendEmail(subject: string, recipient: string, content: string): Promise<void> {

  await this.mailerService.sendMail({

    to: recipient,

    subject,

    text: content,

  });

}



async getIndex(): Promise<ManagementEntity[]> {

  return this.managementRepo.find();

}

async getStudentById(id: number): Promise<StudentEntity> {
  return this.studentRepo.findOneBy({ id });

}



async addStudent(data: StudentUpdateDTO): Promise<StudentEntity> {

  return this.studentRepo.save(data);

}




async updateStudent(

id: number,

updatedStudent: Partial<StudentEntity>

): Promise<StudentEntity> {

await this.studentRepo.update({ id }, updatedStudent);

return this.studentRepo.findOneBy({ id });

}






async deleteStudent(id: number): Promise<string> {

  await this.studentRepo.delete(id);

  return "Student deleted successfully";

}




async getAllStudents(): Promise<StudentEntity[]> {

  return this.studentRepo.find();

}

async getStudentsByFaculty (facultyid: number): Promise<ManagementEntity[]> {

  return this.managementRepo.find({

      where: { id: facultyid },

      relations: {

          students: true,

      },

  });

}

async signup(data: ManagementDTO): Promise<ManagementEntity> {
  const salt = await bcrypt.genSalt();
  data.password = await bcrypt.hash(data.password,salt);
 return this.managementRepo.save(data);
}

// async signIn(data: ManagementLoginDTO) {
//   const userdata= await this.managementRepo.findOneBy({email:data.email});
// const match:boolean = await bcrypt.compare(data.password, userdata.password);
// return match;

// }
// async signIn(data: ManagementLoginDTO) {
//   const userdata= await this.managementRepo.findOneBy({email:data.email, password:data.password});

//   if (!userdata) {
//     // Handle the case when the user data is not found.
//     return false;
//   }

//   // const dataPassword = data.password.toString(); // Convert to string if not already.
//   // const userPassword = userdata.password.toString(); // Convert to string if not already.

//   // const match: boolean = await bcrypt.compare(dataPassword, userPassword);
 
//   const match:boolean = await bcrypt.compare(data.password, userdata.password);
//   return match;
// }


async signIn(data: ManagementLoginDTO) {

  const userdata = await this.managementRepo.findOneBy({ email: data.email });




  if (!userdata) {

    // Handle the case when the user data is not found.

    return false;

  }




  const match = await bcrypt.compare(data.password, userdata.password);

  return match;

}



async updateManagement(email:string, data: ManagementDTO): Promise<ManagementEntity> {

  await this.managementRepo.update(data.id, data);

  return this.managementRepo.findOneBy({ id: data.id });

}

async updateManagementById(id: number, data: ManagementDTO): Promise<ManagementEntity> {

  await this.managementRepo.update(id, data);

  return this.managementRepo.findOneBy({ id });

}

async addFaculty(data: FacultUpdateDTO): Promise<FacultyEntity> {

  return this.facultyRepo.save(data);

}

async updateFaculty(

  id: number,
  
  updatedFaculty: Partial<FacultyEntity>
  
  ): Promise<FacultyEntity> {
  
  await this.facultyRepo.update({ id }, updatedFaculty);
  
  return this.facultyRepo.findOneBy({ id });
  
  }


  async deleteFaculty(id: number): Promise<string> {

    await this.facultyRepo.delete(id);
  
    return "Faculty deleted successfully";
  
  }



  // async createOrederDetails(ManagementData: Partial<ManagementEntity>, LibraryData: Partial<LibraryEntity>): Promise<LibraryEntity> {

  //   const library = this.libraryRepo.create(LibraryData);
  
  //   const managements = this.managementRepo.create({

  //     ...ManagementData,
  
  //     libraries: [library],
  
  //   });
  

  //   await this.libraryRepo.save(library);
  
  //   return this.managementRepo.save(managements);
  
  // }
  
  






  //studentprofile

  // async createStudentWithProfile(studentData: Partial<StudentEntity>, profileData: Partial<StudentProfile>): Promise<StudentEntity> {
  //   const profile = this.studentProfileRepository.create(profileData);
  //   const student = this.studentRepo.create({
  //     ...studentData,
  //     profiles: [profile],
  //   });

  //   await this.studentProfileRepository.save(profile);
  //   return this.studentRepo.save(student);
  // }


  async getProfileById(id: number): Promise<ManagementProfile> {
    return this.profileRepo.findOneBy({id});
}

async updateProfile(
    id: number,
    updatedProfile: Partial<ManagementProfile>
  ): Promise<ManagementProfile> {
    await this.profileRepo.update({ id }, updatedProfile);
    return this.profileRepo.findOneBy({ id });
  }


 

















}



