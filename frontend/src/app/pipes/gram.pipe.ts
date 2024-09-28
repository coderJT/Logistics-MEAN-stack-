import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gram',
  standalone: true
})
export class GramPipe implements PipeTransform {

  transform(value: number): string {
    if (!value) return '';
    return `${value * 1000}g`;
  }

}
