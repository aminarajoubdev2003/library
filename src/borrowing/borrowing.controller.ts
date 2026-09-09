import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { BorrowingService } from './borrowing.service';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';
import { ReturnBorrowingDto } from './dto/return-borrowing.dto';
import { JwtAuthGuard } from '../auth/guards/jwt_auth.guard';

@Controller('borrowing')
export class BorrowingController {
  constructor(private readonly borrowingService: BorrowingService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Request() request: any,
    @Body() createBorrowingDto: CreateBorrowingDto,
  ) {
    return this.borrowingService.create(request, createBorrowingDto);
  }

  @Get()
  findAll() {
    return this.borrowingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.borrowingService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('return/:id')
  returnBook(
    @Request() request: any,
    @Param('id', ParseIntPipe) id: number,
    //@Body() updateBorrowingDto: ReturnBorrowingDto,
  ) {
    return this.borrowingService.returnBook(request,id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.borrowingService.remove(+id);
  }
}
