import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run somting before a request is handled
    // by the request handler
    // 요청 처리전에 하고싶은 작업있을때 여기
    // console.log(`I'm running before the handler`, context);
    return handler.handle().pipe(
      map((data: any) => {
        //run somting before the response is sent out
        //응답이 나가기 전에 처리할 작업 여기
        // console.log(`I'm running befroe response is sent out`, data);
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
