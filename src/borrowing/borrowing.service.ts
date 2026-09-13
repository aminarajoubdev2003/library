import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Borrowing } from './entities/borrowing.entity';
import { Repository } from 'typeorm';
import { Book } from '../book/entities/book.entity';

@Injectable()
export class BorrowingService {
  constructor(
    @InjectRepository(Borrowing)
    private readonly borrowRepository: Repository<Borrowing>,
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  async create(user_id: number , createBorrowingDto: CreateBorrowingDto) {
    const book = await this.bookRepository.findOneBy({
      id: createBorrowingDto.book_id,
    });
    if (!book) {
      throw new NotFoundException('Book Not Found');
    }
    if (book.available_copies <= 0) {
      throw new ConflictException('No available copies',);
    }
    const borrowing = this.borrowRepository.create({
      user_id: user_id,
      book_id: book.id,
      borrow_date: new Date(),
      due_date: new Date(createBorrowingDto.due_date),
    });
    if (borrowing) {
      book.available_copies = book.available_copies - 1;
      await this.bookRepository.save(book);
    }
    return await this.borrowRepository.save(borrowing);
  }

  async returnBook(user_id: number, id: number) {
    const borrowing = await this.borrowRepository.findOne({
      where: {
      id: id,
      user_id: user_id,
    },
    relations: { book: true },
    })
    
    if (!borrowing) {
      throw new NotFoundException('Book Not Found');
    }

    if(borrowing.return_date){
      throw new BadRequestException('Book already returned');
    }

    const returnDate = new Date()
    borrowing.return_date = returnDate

    let fine = 0
    if( returnDate > borrowing.due_date){
      const lateDays = Math.max(0,Math.ceil(( returnDate.getTime()-borrowing.due_date.getTime())
      / (1000 * 60 * 60 * 24)))
      fine = lateDays * 10;
    }
    borrowing.fine = fine;
    borrowing.book.available_copies += 1

    await this.bookRepository.save(borrowing.book)
    return this.borrowRepository.save(borrowing)
  }

  async findAll( user_id: number ) {
    const borrowings = await this.borrowRepository.find({
      where: {
        user_id: user_id
      }
    });
    if ( borrowings.length === 0 ) {
      throw new NotFoundException('Borrowings Not Found');
    }
    return borrowings
  }
}
