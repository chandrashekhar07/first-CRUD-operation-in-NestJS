import { BadRequestException, CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor, NotFoundException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { catchError, tap } from 'rxjs/operators';
import { QueryFailedError } from 'typeorm/error';
import { HttpException } from '@nestjs/common';
import { json } from 'express';







@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle()
      .pipe(



        catchError(error => {

          const request = context.switchToHttp().getRequest();
          const now = Date.now();

          const response = context.switchToHttp().getResponse();




          const exceptionContent = {
            error,
            request: {
              url: `${request.protocol}://${request.hostname}${request.originalUrl}`,
              method: request.method,
              body: request.body
            },
            message: error.message ,
            http_status: response.statusCode,        //error code not working properly
            response_time: Date.now() - now,
          };

          console.log("the error is", error);
          // throw JSON.stringify(exceptionContent)
          throw new BadRequestException(exceptionContent)

        }))
  }
}
