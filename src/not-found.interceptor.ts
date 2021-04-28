import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import {catchError} from 'rxjs/operators';



@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle()
    .pipe(catchError(error => {

       console.log("typeof error is ",typeof(error))
       console.log("typeof enitynotfounderror is", typeof(EntityNotFoundError))

      if (error == EntityNotFoundError || error instanceof EntityNotFoundError )  {
        console.log(" error in  instance of entity not found")
        throw new NotFoundException(error.message);
      }
      else{
        console.log("error in else part of interceptor " ,error)
        throw error;

      }
      
    }))
  }
}
