import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { OneToMany } from "typeorm/browser";
import { Borrowing } from "../../borrowing/entities/borrowing.entity";

export enum UserRole{
    ADMIN = 'ADMIN',
    MEMBER = 'MEMBER',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    email:string

    @Column()
    password:string
    
    @Column()
    role:UserRole
    
    @OneToMany( () => Borrowing , (borrowing) => borrowing.user)
    borrowings:Borrowing[]
}
