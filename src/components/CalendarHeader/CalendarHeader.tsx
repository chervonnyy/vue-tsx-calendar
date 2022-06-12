import dayjs from 'dayjs';
import { Component } from 'vue-property-decorator';
import { VueComponent } from '../../shims-vue';
import { MONTH_NAMES } from '@/constants';

import styles from './CalendarHeader.css?module';

@Component
export default class CalendarHeader extends VueComponent {

  get header() {
    const currentMonth = dayjs().get('month');
    const currentYear = dayjs().get('year');
    return `${MONTH_NAMES[currentMonth]} ${currentYear}`;
  }

  render() {
    return (
      <h2 class={styles.title}>
        {this.header}
      </h2>
    );
  }
}
