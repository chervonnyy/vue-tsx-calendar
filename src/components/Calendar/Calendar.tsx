import { Component } from 'vue-property-decorator';
import { VueComponent } from '../../shims-vue';
import { useStore } from 'vuex-simple';
import MyStore from '@/store/store';

import CalendarDay from '../CalandarDay/CalendarDay';
import CalendarHeader from '../CalendarHeader/CalendarHeader';

import styles from './Calendar.css?module'; 

@Component
export default class Calendar extends VueComponent {

	public store: MyStore = useStore(this.$store);

	currentDate: Date = new Date();

	getFirstMonthDay(date: Date): number {
		const dateString: string = `${date.getFullYear()}-${(date.getMonth() + 1)}-1`;
		return new Date(dateString).getDay();
	}

	mapDaysToMonth(): Array<number | undefined> {
		const firstDay: number = this.getFirstMonthDay(this.currentDate);
		const days: Array<number | undefined> = [];
		let day: number = firstDay - 1;
		days[day] = 1;
		for (let i: number = 2; i <= 30; i++, day++) {
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
		for (let i: number = 0; i < daysMappedToMonth.length; i++) {
			const date = daysMappedToMonth[i];
			
			// error that I didn't know how to handle 
			daysTemplate.push(<CalendarDay date={date} />);
		}
		return daysTemplate;
	}

	render() {
		return (
			<div class={styles.container}>
				<CalendarHeader />
				<div class={styles.grid}>
					{...this.mapWeekdays()}
					{...this.mapDays()}
				</div>
			</div>
		);
	}
}
