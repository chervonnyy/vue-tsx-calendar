import { Component } from 'vue-property-decorator';
import { useStore } from 'vuex-simple';
import { VueComponent } from '../../shims-vue';
import MyStore from '@/store/store';
import { WEEKDAYS } from '@/constants';

import CalendarDay from '../CalandarDay/CalendarDay';
import CalendarHeader from '../CalendarHeader/CalendarHeader';

import styles from './Calendar.css?module';
import { getDaysInMonth, getFirstDayOfMonth } from '@/utils/timestamp';

@Component
export default class Calendar extends VueComponent {
  
  public store: MyStore = useStore(this.$store);

  calendar: number[] = [];

  get classNames() {
    const gridClassNames = [styles.grid];
    const weeksInMonth = this.calendar.length / 7;
    weeksInMonth > 5 && gridClassNames.push(styles.longMonth);
    return gridClassNames;
  }

  get weekdaysNames() {
    return WEEKDAYS.map(weekday => <span>{weekday}</span>);
  }

  buildCalendar() {
    const calendar: number[] = [];
    // week day of the first day of the month: sunday, monday, etc.
    const firstDayOfMonth = getFirstDayOfMonth();
    const daysInMonth = getDaysInMonth();

    for (let i = 0 + 1; i <= daysInMonth + firstDayOfMonth; i++) {
      const currentDay = i <= firstDayOfMonth ? 0 : calendar[i - 1] + 1;
      if (currentDay > daysInMonth) break;
      calendar[i] = currentDay;
    }

    this.calendar = calendar;
  }

  mounted() {
    this.buildCalendar();
  }

  render() {
    return (
      <div class={styles.container}>
        <CalendarHeader />
        <div class={this.classNames}>
          {...this.weekdaysNames}
          {...this.calendar.map(date => (
            <CalendarDay date={date} />
          ))}
        </div>
      </div>
    );
  }
}
