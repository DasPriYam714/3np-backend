import { Module } from '@nestjs/common';



import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagementModule } from './Management/management.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerService } from '@nestjs-modules/mailer';





@Module({

  imports: [

    MailerModule.forRoot({

      transport: {

        service: 'Gmail',

        auth: {

          user: 'priyamdas.aiub@gmail.com',

          pass: 'pqvgrkcvnvjtbvvu',

        },

      },

      defaults: {

        from: '"Priyam" <priyamdas.aiub@gmail.com>',

      },

      // template: {

      //   dir: __dirname + './Student/templates',

        // adapter: new HandlebarsAdapter(),

      //   options: {

      //     strict: true,

      //   },

      // },

    }),

ManagementModule, TypeOrmModule.forRoot(

    { type: 'postgres',

     host: 'localhost',

     port: 5432,

     username: 'postgres',

     password: 'student',

     database: '3np_backend',

     autoLoadEntities: true,

     synchronize: true,

     } ),

    ],

  controllers: [],

  providers: [],

})

export class AppModule {}