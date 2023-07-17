


import { LibraryEntity } from "src/ManageLibrary/libraryDetails.entity";
import { StudentEntity } from "src/Student/student.entity";
import { Column, Entity, OneToMany,OneToOne, PrimaryGeneratedColumn } from "typeorm";




@Entity("management")

export class ManagementEntity{
@PrimaryGeneratedColumn()
id: number;




@Column({ type: "varchar", length: 150 })

firstName: string;


@Column({ type: "varchar", length: 150 })

lastName: string;

@Column({ type: "varchar", length: 150 })
email: string;

@Column({ type: "varchar", length: 150 })
password: string;

@Column({nullable:true})
image: string;







@OneToMany(() => StudentEntity, student => student.management)

 students: StudentEntity[];


 @OneToMany(() => StudentEntity, faculty => faculty.management)

 facultys: StudentEntity[];


 @OneToOne(() => ManagementProfile, profile => profile.management)

profiles:ManagementProfile[];

@OneToOne(() => LibraryEntity, library => library.managements)

 libraries: LibraryEntity[];
}











@Entity("ManagementProfile")
export class ManagementProfile{
@PrimaryGeneratedColumn()
id:number;
@Column()
name:string;
@Column()
email: string;
@Column({type: "varchar",length: 150})
photo:string;
@Column({type: "varchar",length:150})
password:string;

@OneToOne(() =>ManagementEntity, management =>management.profiles)

management:ManagementEntity;


}