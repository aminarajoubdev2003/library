import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Column } from "typeorm/browser";
import { User } from "../../user/entities/user.entity";
import { Book } from "../../book/entities/book.entity";

@Entity()
export class Borrowing {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    user_id:number

    @Column()
    book_id:number

    @Column({ type: 'datetime'})
    borrow_date:Date

    @Column({ type: 'datetime'})
    due_date:Date

    @Column({ default:null , type: 'datetime' })
    return_date:Date | null

    @Column({ default: 0 })
    fine:number

    @ManyToOne( () => User , (user) => user.borrowings)
    @JoinColumn({ name:"user_id"})
    user:User

    @ManyToOne( () => Book , (book) => book.borrowings)
    @JoinColumn({ name:"book_id"})
    book:Book
}
