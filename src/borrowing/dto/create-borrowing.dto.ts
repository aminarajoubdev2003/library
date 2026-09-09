import { IsDateString, IsInt, IsNotEmpty, IsNumber } from "class-validator"

export class CreateBorrowingDto {
    @IsNumber()
    @IsInt()
    book_id:number
    
    @IsNotEmpty()
    @IsDateString()
    due_date:string
    
}
