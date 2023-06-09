import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textLimitPipe',
})
export class TextLimitPipe implements PipeTransform {
  transform(value: string, maxValue: number): string {
    if (value.length <= maxValue) {
      return value;
    } else {
      return value.slice(0, maxValue) + '...';
    }
  }
}
