import { Module } from "@nestjs/common";
import { ManagementController,  } from "./management.controller";
import { ManagementService,  } from "./management.service";
import { StudentEntity } from "src/Student/student.entity";
import { ManagementEntity, ManagementProfile } from "./management.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FacultyEntity } from "src/Faculty/faculty.entity";
import { MailerModule } from "@nestjs-modules/mailer";
import { LibraryEntity } from "src/ManageLibrary/libraryDetails.entity";




@Module({

    imports: [

     

     

      MailerModule.forRoot({

        transport: {

          host: 'your-smtp-host',

          port: 465,

          secure: false,

          auth: {

            user: 'your-email-username',

            pass: 'your-email-password',

          },

        },

        defaults: {

          from: 'your-email-address',

        },

        

        

      }),
        
        
        TypeOrmModule.forFeature([ManagementEntity, StudentEntity, ManagementProfile,FacultyEntity,LibraryEntity]),],
    controllers:[ManagementController],
    providers: [ManagementService],

})
export class ManagementModule {}