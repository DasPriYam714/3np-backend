import { ManagementEntity } from "src/Management/management.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";




@Entity("library")

export class LibraryEntity{

@PrimaryGeneratedColumn()

id: number;

@Column()

BookName: string;

@Column()

StudentName: string;

@Column()

BookIssuedBy: string;

@Column()

Date: String;

@OneToOne(() => ManagementEntity, management => management.libraries)

 managements: ManagementEntity[];

}