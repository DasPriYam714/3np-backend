import { ManagementEntity } from "src/Management/management.entity";

import {IsNull, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";







@Entity("Faculty")

export class FacultyEntity{

@PrimaryGeneratedColumn()

id:number;

@Column({name:'name',type: "varchar",length: 150})

name:string;

@Column({type: "varchar",length: 150})

email:string;

@Column({ type: "varchar", length: 150, nullable:true })
department: string;

@Column({nullable:true})

position:string;




@ManyToOne(() => ManagementEntity, management => management.facultys)

management: ManagementEntity;




}