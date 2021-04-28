import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import {catchError} from 'rxjs/operators';






@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle()
    .pipe(catchError(error => {

      //  console.log("typeof error is ",typeof(error))
     

      if (error == EntityNotFoundError || error instanceof EntityNotFoundError )  {
        console.log("the error msg in if statement of interceptor is ", error.message)
     
        throw new NotFoundException(error.message);
       
      }


      
      else if(error instanceof Error  ){
        console.log("the error msg in else if statemet of interceptor is:" , error)
       
         throw new Error("errormsg");
      }



      else{
        console.log("error in else part of interceptor " ,error)
        throw error;

      }
      
    }))
  }
}
