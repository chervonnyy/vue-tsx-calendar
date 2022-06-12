import { Component } from 'vue-property-decorator';
import { VueComponent } from '../../shims-vue';
import { MONTH_NAMES } from '@/constants';

import styles from './CalendarHeader.css?module';
import { getCurrent } from '@/utils/timestamp';

@Component
export default class CalendarHeader extends VueComponent {

  get header() {
    const currentMonth = getCurrent('month');
    const currentYear = getCurrent('year');
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
