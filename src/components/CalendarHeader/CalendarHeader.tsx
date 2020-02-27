import { Component } from 'vue-property-decorator';
import { VueComponent } from '../../shims-vue';

import styles from './CalendarHeader.css?module'; 

@Component
export default class CalendarHeader extends VueComponent {

    currentDate: Date = new Date();

    get month(): number {
		return this.currentDate.getMonth();
    }
    
    get year(): number {
		return this.currentDate.getFullYear();
    }

    getMonthName(): string {
		const months: Array<string> = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
		return months[this.month];
    }
    
    buildHeader(): string {
		return `${this.getMonthName()} ${this.year}`;
    }
    
    render() {
        const header = this.buildHeader();
        return (<h2 class={styles.title}>{header}</h2>);
    }
}