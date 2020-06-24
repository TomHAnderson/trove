import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToDate'
})
export class StringToDatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return new Date(value);
  }

}
