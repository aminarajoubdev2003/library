import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserRole } from "../../user/entities/user.entity";

@Injectable()
export class RolesGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean  {
        const reqest = context.switchToHttp().getRequest()
        const user = reqest.user
        return user.role === UserRole.ADMIN
    }
}