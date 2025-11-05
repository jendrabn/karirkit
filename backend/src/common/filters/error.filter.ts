import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class ErrorFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {}
}
