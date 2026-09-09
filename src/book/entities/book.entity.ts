import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Borrowing } from "../../borrowing/entities/borrowing.entity";

@Unique(['title'])
@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id:number
    
    @Column({ unique: true })
    title:string
    
    @Column()
    author:string

    @Column()
    total_copies:number

    @Column()
    available_copies:number

    @OneToMany( () => Borrowing , (borrowing) => borrowing.book)
    borrowings:Borrowing[]
}
