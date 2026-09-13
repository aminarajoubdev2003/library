import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { BorrowingService } from './borrowing.service';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';
import { JwtAuthGuard } from '../auth/guards/jwt_auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('borrowing')
export class BorrowingController {
  constructor(private readonly borrowingService: BorrowingService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @CurrentUser() user: any,
    @Body() createBorrowingDto: CreateBorrowingDto,
  ) {
    return this.borrowingService.create(user.id, createBorrowingDto);
  }


  @UseGuards(JwtAuthGuard)
  @Patch('return/:id')
  returnBook(
    @CurrentUser() user: any,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.borrowingService.returnBook(user.id,id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll( @CurrentUser() user: any ) {
    return this.borrowingService.findAll( user.id );
  }

}
