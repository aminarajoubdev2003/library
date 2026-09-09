import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { stat } from "fs";

@Catch(HttpException)
export class  BookExceptionFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost){

        const response = host.switchToHttp().getResponse()
        const status = exception.getStatus()
        const message = exception.getResponse()

        response.status(status).json({
            statusCode: status,
            message: message
        })
    }
}