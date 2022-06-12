import { Component } from 'vue-property-decorator';
import { useStore } from 'vuex-simple';
import { VueComponent } from '../../shims-vue';
import MyStore from '@/store/store';

import CalendarDay from '../CalandarDay/CalendarDay';
import CalendarHeader from '../CalendarHeader/CalendarHeader';

import styles from './Calendar.css?module';

@Component
export default class Calendar extends VueComponent {
  public store: MyStore = useStore(this.$store);

  currentDate: Date = new Date();

  getFirstMonthDay(date: Date): number {
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)}-1`;
    return new Date(dateString).getDay();
  }

  mapDaysToMonth(): Array<number | undefined> {
    const firstDay: number = this.getFirstMonthDay(this.currentDate);
    const days: Array<number | undefined> = [];
    let day: number = firstDay === 0 ? 6 : firstDay - 1;
    days[day] = 1;
    for (let i = 2; i <= 31; i++, day++) {
      if (i > 27) {
        const currentMonth = this.currentDate.getMonth();
        const possibleDate = new Date(`${this.currentDate.getFullYear()}-${currentMonth + 1}-${i}`);
        if (possibleDate.getMonth() !== currentMonth) {
          break;
        }
      }
      days[days.length] = i;
    }
    return days;
  }

  mapWeekdays(): Array<JSX.Element> {
    const weekdays: Array<string> = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    return weekdays.map((weekday: string) => (
			<span>{weekday}</span>
    ));
  }

  mapDays(): Array<JSX.Element> {
    const daysMappedToMonth: Array<number | undefined> = this.mapDaysToMonth();
    const daysTemplate = [];
    for (let i = 0; i < daysMappedToMonth.length; i++) {
      const date: number | undefined = daysMappedToMonth[i];
      daysTemplate.push(<CalendarDay date={date} />);
    }
    return daysTemplate;
  }

  render() {
    const gridClassNames: Array<string> = [styles.grid];
    const weekdays: Array<JSX.Element> = this.mapWeekdays();
    const days: Array<JSX.Element> = this.mapDays();
    const weeksInMonth: number = days.length / 7;

    if (weeksInMonth > 5) {
      gridClassNames.push(styles.longMonth);
    }

    return (
			<div class={styles.container}>
				<CalendarHeader />
				<div class={gridClassNames.join(' ')}>
					{...weekdays}
					{...days}
				</div>
			</div>
    );
  }
}
