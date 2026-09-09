import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor( @InjectRepository (Book) private readonly bookRepository: Repository<Book>){}

  async create(createBookDto: CreateBookDto) {
    const  existingBook = await this.bookRepository.findOne({
      where: {
      title: createBookDto.title,
    }
    })
    if( existingBook ){
      throw new ConflictException('Book alerady exisist')
    }
    const book =  this.bookRepository.create({
      title: createBookDto.title,
      author: createBookDto.author,
      total_copies: createBookDto.total_copies,
      available_copies: createBookDto.total_copies
    })
    return  this.bookRepository.save(book)
  }

  findAll() {
    return `This action returns all book`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  async remove(id: number) {
    const book = await this.bookRepository.findOneBy({id})
    if( !book ){
      throw new NotFoundException('Book Not Found')
    }
    await this.bookRepository.delete(id);
    return { message:'Book deleted successfully' };
  }
}
