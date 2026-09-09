import { Module } from '@nestjs/common';
import { BorrowingService } from './borrowing.service';
import { BorrowingController } from './borrowing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrowing } from './entities/borrowing.entity';
import { Book } from '../book/entities/book.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Borrowing, Book]),AuthModule],
  controllers: [BorrowingController],
  providers: [BorrowingService],
})
export class BorrowingModule {}
