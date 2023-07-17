import { Controller, Get, HttpException, HttpStatus, ParseIntPipe, ValidationPipe } from "@nestjs/common";
import { Body, Param,Delete, Post, Put, Query, Res, UploadedFile, UseInterceptors, UsePipes, Session, UseGuards,  } from "@nestjs/common/decorators";
import { ManagementService,  } from "./management.service";
import { FacultUpdateDTO,  ManagementDTO, StudentDTO, StudentUpdateDTO } from "./management.dto";
import { MulterError, diskStorage } from "multer";
import { FileInterceptor } from "@nestjs/platform-express";
import { ManagementEntity, ManagementProfile } from "./management.entity";
import { StudentEntity } from "src/Student/student.entity";
import session = require("express-session");
import { SessionGuard } from "./session.gaurd";
import { FacultyEntity } from "src/Faculty/faculty.entity";
import { LibraryEntity } from "src/ManageLibrary/libraryDetails.entity";
//


@Controller('management')
export class ManagementController{

    constructor(private readonly managementService: ManagementService){}

/*//facultys index

    @Get('/facultyindex')
    getFacultyindex(): string{
        return this.managementService.getFacultyIndex();
    }

//students index

    @Get('/studentindex')
    getStudentIndex(): any {
    return this.managementService.getStudentIndex();
    }

    //Get student by ID


    @Post('/search/:id')
    getStudentByID(@Param('id') id:number): any{
        return this.managementService.getStudentByID(id);

        
    }

//add student

   @Post('/addStudent')
   @UsePipes(new ValidationPipe())
   addStudent(@Body() data:StudentUpdateDTO):string{
    console.log(data);
    return this.managementService.addStudent(data);
   }

   //add Faculty

   @Post('/addFaculty')
   @UsePipes(new ValidationPipe())
   addFaculty(@Body() data:FacultyUpdateDTO):string{
    console.log(data);
    return this.managementService.addFaculty(data);
   }
   /*@Get('/search')
   getAdminbyName(@Query() qry:StudentUpdatetDTO): string {
   
   return this.managementService.getStudentByName(qry);
   }

   //Update Student


   @Put('/updateStudent/:id')
@UsePipes(new ValidationPipe())
updateStudentbyID(@Param() id:number,@Body() data:StudentUpdateDTO): object{
    return this.managementService.updateStudentById(id,data);
}

//Update Faculty


@Put('/updateFaculty/:id')
@UsePipes(new ValidationPipe())
updateFacultybyID(@Param() id:number,@Body() data:FacultyUpdateDTO): object{
    return this.managementService.updateFacultyById(id,data);
}

*/
//Upload picture and File


@Post(('/upload'))
@UseInterceptors(FileInterceptor('myfile',
{ fileFilter: (req, file, cb) => {
    if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg|pdf)$/))
     cb(null, true);
    else {
    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
    }
    },
    limits: { fileSize: 30000000 },
    storage:diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname)
    },
    })
    }
))
uploadFile(@UploadedFile() myfileobj: Express.Multer.File):object
{
 console.log(myfileobj)   
return ({message:"file uploaded"});
}

@Get('/getfile/:name')
getImages(@Param('name') name, @Res() res) {
 res.sendFile(name,{ root: './uploads' })
 }

 @Get('/index')

 async getIndex(): Promise<ManagementEntity[]> {

   return this.managementService.getIndex();

 }








 









 /*@Put('/updatestudent/:id')

 async updateStudentById(

   @Param('id') id: number,

   @Body() data: StudentDTO

 ): Promise<StudentEntity> {

   return this.facultyService.updateStudentById(id, data);

 }*/

 @Put('/updateStudent/:id')

async updateStudentById(

@Param('id', ParseIntPipe) id: number,

@Body() student: Partial<StudentEntity>

): Promise<object> {

const updatedStudent = await this.managementService.updateStudent(id, student);

return { message: 'Student updated successfully', student: updatedStudent };

}








 @Get('/students')

 async getAllStudents(): Promise<StudentEntity[]> {

   return this.managementService.getAllStudents();

 }




 @Get('/students/faculty/:facultyid')

 async getStudentsByFaculty(

   @Param('facultyid') facultyid: number

 ): Promise<ManagementEntity[]> {

   return this.managementService.getStudentsByFaculty(facultyid);

 }


 @Post('/signup')
 @UseInterceptors(FileInterceptor('image',
     {
         fileFilter: (req, file, cb) => {
             if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                 cb(null, true);
             else {
                 cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
             }
         },
         limits: { fileSize: 3 * 1024* 1024 },
         storage: diskStorage({
             destination: './uploads',
             filename: function (req, file, cb) {
                 cb(null, Date.now() + file.originalname)
             },
         })
     }
 ))
 @UsePipes(new ValidationPipe)
 signup(@Body() mydata: ManagementDTO, @UploadedFile() imageobj: Express.Multer.File) {
     console.log(mydata);
     console.log(imageobj.filename);
     mydata.image = imageobj.filename;
     return this.managementService.signup(mydata);

 }


//  @Post('/signin')
//     signIn(@Body() data: ManagementDTO, @Session() session) {

//         if (this.managementService.signIn(data)) {
//             session.email = data.email;
//             // session.password = data.password;
//             return true;
//         }
//         else {

//             return false;
//         }
//         // return this.adminService.signIn(data);
//     }




@Post('/signin')

async signIn(@Body() data: ManagementDTO, @Session() session) {

  const isSignInSuccessful = await this.managementService.signIn(data);

 

  if (isSignInSuccessful) {

    session.email = data.email;

    // session.password = data.password;

    return true;

  } else {

    return false;

  }

}

    @Post('logout')

async logout(@Session() session): Promise<object> {

 

  session.destroy();

  return { message: 'Logout successful' };

}

   /*@Put('/updateadmin/')
@UseGuards(SessionGuard)
@UsePipes(new ValidationPipe())
updateManagement(@Session() session,@Body('name') id: number): any {
console.log(session.email);
return this.managementService.updateStudent(id, session.email);
}*/


@Post('/addstudent')
@UseGuards(SessionGuard)

 async addStudent(@Body() data: StudentUpdateDTO,@Session() session): Promise<StudentEntity> {
  if (!session.email) {

    return ;

  }
  console.log(session.email);

   return this.managementService.addStudent(data);

 }

 @Post('/addfaculty')
 async addFaculty(@Body() data: FacultUpdateDTO): Promise<FacultyEntity> {
  return this.managementService.addFaculty(data);
 
 }


@Get('/students/:id')
@UseGuards(SessionGuard)

async getStudentById(@Param('id') id: number,@Session() session): Promise<StudentEntity> {

  if (!session.email) {

    return ;

  }
  console.log(session.email);

  return this.managementService.getStudentById(id);

}

@Delete('/student/:id')
@UseGuards(SessionGuard)

async deleteStudent(@Param('id', ParseIntPipe) id: number,@Session() session): Promise<object> {
  if (!session.email) {

    return { message: 'Please Login First' } ;

  }

const message = await this.managementService.deleteStudent(id);

return { message };




}



@Put('/updatestudents')

  //@UsePipes(new ValidationPipe())

  @UseGuards(SessionGuard)

  updatesStudent( @Body() data: ManagementDTO,  @Session() session): object {




    if (!session.email) {

      return { message: 'Please Login First' };

    }

    console.log(session.email);

    return this.managementService.updateManagement(session.email, data );

  }





  @Put('/updatestudents/:id')

  //@UsePipes(new ValidationPipe())




  @UseGuards(SessionGuard)




  updateStudentbyID(@Param("id") id: number, @Body() data: ManagementDTO): object {

      return this.managementService.updateManagementById(id, data);

  }





  @Get('/getstudent/:studentid')
  @UseGuards(SessionGuard)

  async getstudent(@Param('studentid', ParseIntPipe) studentid: number,@Session() session): Promise<object> {

    if (!session.email) {

      return { message: 'Please Login First' };

    }

    try {

      const student = await this.managementService.getStudentById(studentid);




      if (!student) {

        throw new HttpException('Student does not exist', HttpStatus.NOT_FOUND);

      }




      const courses = await this.managementService.getStudentById(studentid);

      return { message: 'Student found', courses };

    } catch (error) {

      throw new HttpException(error.message, error.getStatus());

    }

  }






  @Post('/send-email')

  async sendEmail(@Body() emailData: { subject: string; recipient: string; content: string }): Promise<void> {

    const { subject, recipient, content } = emailData;

    await this.managementService.sendEmail(subject, recipient, content);

  }



  @Get('profile/:id')
  async getProfileById(@Param('id') id: number): Promise<ManagementProfile> {
    return this.managementService.getProfileById(id);
  }

  @Put('profile/:id')
  async updateProfile(@Param('id') id: number, @Body() profile: Partial<ManagementProfile>): Promise<object> {
    const updatedProfile = await this.managementService.updateProfile(id, profile);
    return { message: 'Profile updated successfully', profile: updatedProfile };
  }















}















