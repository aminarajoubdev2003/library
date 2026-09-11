import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

@Catch(HttpException)
export class  BookExceptionFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost){

        const response = host.switchToHttp().getResponse()
        const status = exception.getStatus()
        const exceptionResponse = exception.getResponse();
        let message : string

        if (typeof exceptionResponse === 'string') {
            message = exceptionResponse;
        } else {
            message = (exceptionResponse as any).message;
        }

        response.status(status).json({
        success: false,
        data: null,
        error: {
        statusCode: status,
        message: message,
        }
        });
    }
}
