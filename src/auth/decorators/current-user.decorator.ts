import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { rethrow } from "@nestjs/core/helpers/rethrow.js";

export const CurrentUser = createParamDecorator(
    
    ( data : unknown , ctx : ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        return request.user
    }
)