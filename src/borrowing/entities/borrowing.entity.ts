import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn , Column} from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Book } from "../../book/entities/book.entity";

@Entity()
export class Borrowing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'int' })
  book_id: number;

  @Column({ type: 'datetime' })
  borrow_date: Date;

  @Column({ type: 'datetime' })
  due_date: Date;

  @Column({ type: 'datetime', nullable: true })
  return_date: Date | null;

  @Column({ type: 'decimal', default: 0 })
  fine: number;

  @ManyToOne(() => User, (user) => user.borrowings)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Book, (book) => book.borrowings)
  @JoinColumn({ name: 'book_id' })
  book: Book;
}
