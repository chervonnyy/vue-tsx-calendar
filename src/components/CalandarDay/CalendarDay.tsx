import { Component, Prop } from 'vue-property-decorator';
import { VueComponent } from '../../shims-vue';
import { useStore } from 'vuex-simple';
import MyStore from '@/store/store';

import styles from './CalendarDay.css?module'

interface Props {
    date: number | undefined
}
@Component
export default class CalendarDay extends VueComponent<Props> {

    @Prop()
    private date!: number

    public store: MyStore = useStore(this.$store);

    handleClick(): void {
        if (this.date) this.store.changeActiveDay(this.date);
    }
    
	render() {

        const activeDay: number = this.store.activeDay;
        const plannedDays: Array<number> = this.store.plannedDays;
        const classNames: Array<string> = [styles.base];

        if (activeDay === this.date) {
            classNames.push(styles.active);
        } else if (plannedDays.includes(this.date)) {
            classNames.push(styles.planned);
        }

		return (
            <div class={classNames.join(' ')} onClick={this.handleClick}>
                {this.date}
            </div>
		);
	}
}