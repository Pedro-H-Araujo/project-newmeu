import { Inject,CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
 @Inject ()
 private readonly jwtService: JwtService;

 async canActivate(context: ExecutionContext): Promise<boolean>{
  const request = context.switchToHttp().getRequest();
  const authorizationHeader = this.extractTokenFromHeader(request);
  if (!authorizationHeader) throw new UnauthorizedException ('No token required');

  try {
    const payload = await this.jwtService.verify(authorizationHeader,
      { secret: process.env.SECRET_KEY }
    );
    request['sub'] = payload;
  } catch (error){
    throw new UnauthorizedException('Invalid token');
  }
  return true;
 }

 private extractTokenFromHeader(request: Request): string | undefined {
  const [type, token]= 
    request.headers.get['authorization']?.split(' ') ?? [];
    return type === 'bearer' ? token : undefined;
  }
}
