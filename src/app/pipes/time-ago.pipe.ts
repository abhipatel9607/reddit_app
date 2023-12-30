import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | number): string {
    if (!value) return '';

    const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    let counter;
    for (const unit in intervals) {
      counter = Math.floor(seconds / intervals[unit]);

      if (counter > 0) {
        if (counter === 1) {
          return counter + ' ' + unit + ' ago';
        } else {
          return counter + ' ' + unit + 's ago';
        }
      }
    }

    return 'Just now';
  }
}
