
import { ManagementEntity } from "src/Management/management.entity";

import {IsNull, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";







@Entity("Student")

export class StudentEntity{


@PrimaryGeneratedColumn()

id:number;

// @Column({name:'fname',type: "varchar",length: 150,nullable:true})

@Column({ nullable: true })

fname:string;

@Column({ nullable: true })

lname:string;

@Column({ nullable: true })

email:string;

@Column({ nullable: true })
department: string;

@Column({ nullable: true })
image:string;



@ManyToOne(() => ManagementEntity, management => management.students)

management: ManagementEntity;




}