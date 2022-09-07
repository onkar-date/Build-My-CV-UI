import * as moment from 'moment';

export default class DateHelper {
  static formatToMonthAndYear(date: string): string {
    console.log(date);
    
    return moment(date).format('MMM, YYYY');
  }
}