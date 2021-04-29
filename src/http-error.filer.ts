import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";




@Catch()
export class ErrorFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const now = Date.now()
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        var message:any

        try {
            message = (exception instanceof Error) ? exception.message : exception.message.error;    
            if (exception.status === HttpStatus.NOT_FOUND) {
                status = HttpStatus.NOT_FOUND;
            }

            if (exception.status === HttpStatus.SERVICE_UNAVAILABLE) {
                status = HttpStatus.SERVICE_UNAVAILABLE;
            }

            if (exception.status === HttpStatus.NOT_ACCEPTABLE) {
                status = HttpStatus.NOT_ACCEPTABLE;
            }

            if (exception.status === HttpStatus.EXPECTATION_FAILED) {
                status = HttpStatus.EXPECTATION_FAILED;
            }

            if (exception.status === HttpStatus.BAD_REQUEST) {
                status = HttpStatus.BAD_REQUEST;
            }

        } catch (error) {
            console.log("the error is.............. ", error)
            message= "nulled"
        }

        finally {



            const errorContent = {
                exception,
                request: {
                    url: `${request.protocol}://${request.hostname}${request.originalUrl}`,
                    method: request.method,
                    body: request.body
                },
                message,
                status,
                response_time: Date.now() - now,
                is_sucess: false
            };



            response.status(errorContent.status).json({ errorContent })
        }
    }

}