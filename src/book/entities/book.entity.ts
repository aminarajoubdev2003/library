import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Borrowing } from "../../borrowing/entities/borrowing.entity";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id:number
    
    @Column({ type: 'varchar', unique: true })
    title:string
    
    @Column({ type: 'varchar' })
    author:string

    @Column({ type: 'int' })
    total_copies:number

    @Column({ type: 'int' })
    available_copies:number

    @OneToMany( () => Borrowing , (borrowing) => borrowing.book)
    borrowings:Borrowing[]
}
