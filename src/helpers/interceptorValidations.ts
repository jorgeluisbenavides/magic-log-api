import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ValidationError } from 'class-validator';

@Injectable()
export class ValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error && error.statusCode === 400 && error.errors) {
          const errors = this.formatValidationErrors(error.errors);
          throw new HttpException(
            {
              statusCode: HttpStatus.BAD_REQUEST,
              message: 'Validation failed',
              errors: errors,
            },
            HttpStatus.BAD_REQUEST,
          );
        }

        throw error;
      }),
    );
  }

  private formatValidationErrors(errors: ValidationError[]): any[] {
    return errors.map((err) => ({
      field: err.property,
      constraints: err.constraints,
    }));
  }
}
