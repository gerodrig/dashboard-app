import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string): string | null {
    if (value) {
      return value.split(' ').map(word => word[0].toUpperCase() + word.substr(1)).join(' ');
    }
    return null;
  }

}
