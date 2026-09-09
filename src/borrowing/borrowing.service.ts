import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';
import { ReturnBorrowingDto } from './dto/return-borrowing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Borrowing } from './entities/borrowing.entity';
import { Repository } from 'typeorm';
import { Book } from '../book/entities/book.entity';
import { Request } from 'express';

@Injectable()
export class BorrowingService {
  constructor(
    @InjectRepository(Borrowing)
    private readonly borrowRepository: Repository<Borrowing>,
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  async create(request: any, createBorrowingDto: CreateBorrowingDto) {
    const book = await this.bookRepository.findOneBy({
      id: createBorrowingDto.book_id,
    });
    if (!book) {
      throw new NotFoundException('Book Not Found');
    }
    if (book.available_copies <= 0) {
      throw new NotFoundException('Book Not Found');
    }
    const borrowing = this.borrowRepository.create({
      user_id: request.user.id,
      book_id: book.id,
      borrow_date: new Date(),
      due_date: new Date(createBorrowingDto.due_date),
    });
    if (borrowing) {
      book.available_copies = book.available_copies - 1;
      const updatedBook = await this.bookRepository.save(book);
    }
    return await this.borrowRepository.save(borrowing);
  }

  findAll() {
    return `This action returns all borrowing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} borrowing`;
  }

  async returnBook(request:any, id: number) {
    const borrowing = await this.borrowRepository.findOne({
      where: {
      id: id,
      user_id: request.user.id,
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
    if( returnDate > borrowing.due_date){
      borrowing.fine = 500
    }
    borrowing.book.available_copies += 1

    await this.bookRepository.save(borrowing.book)
    return this.borrowRepository.save(borrowing)
  }

  remove(id: number) {
    return `This action removes a #${id} borrowing`;
  }
}
