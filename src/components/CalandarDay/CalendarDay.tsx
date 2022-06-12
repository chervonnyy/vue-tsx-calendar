import { Component, Prop } from 'vue-property-decorator';
import { useStore } from 'vuex-simple';
import { VueComponent } from '../../shims-vue';
import MyStore from '@/store/store';
import { getCurrentDate } from '@/utils/timestamp';

import styles from './CalendarDay.css?module';
@Component
export default class CalendarDay extends VueComponent<{ date?: number }> {
  
  @Prop() private date!: number;

  public store: MyStore = useStore(this.$store);

  handleClick(): void {
    if (this.date) this.store.changeActiveDay(this.date);
  }

  get isActiveDay() {
    return this.store.activeDay === this.date;
  }

  get isPlannedDay() {
    return this.store.plannedDays.includes(this.date);
  }

  get isToday() {
    return this.date === getCurrentDate();
  }

  get classNames() {
    const classes = [styles.base];
    this.isActiveDay && classes.push(styles.active);
    this.isPlannedDay && classes.push(styles.planned);
    this.isToday && classes.push(styles.today);
    return classes;
  }

  render() {
    return (
      <div class={this.classNames} onClick={this.handleClick}>
        {this.date || ''}
      </div>
    );
  }
}
