import {  IsNotEmpty, IsNumber , IsPositive, IsString, Matches } from "class-validator"

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/^[\u0600-\u06FF\s]+$/,{
        message:'العنوان يجب أن يحتوي على أحرف عربية فقط'
    })
    
    title:string
    
    @IsString()
    @IsNotEmpty()
    @Matches(/^[\u0600-\u06FF\s]+$/,{
        message:'اسم المؤلف يجب  أن يحتوي على أحرف عربية فقط'
    })
    author:string
    
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    total_copies:number
    
}
