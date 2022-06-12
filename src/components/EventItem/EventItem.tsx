import { Component, Prop } from 'vue-property-decorator';
import { useStore } from 'vuex-simple';
import { VueComponent } from '../../shims-vue';
import MyStore from '@/store/store';
import { PlannedEvent } from '@/types';

import styles from './EventItem.css?module';

interface Props {
	data: PlannedEvent
}
@Component
export default class EventItem extends VueComponent<Props> {
  public store: MyStore = useStore(this.$store);

	@Prop()
  private data!: PlannedEvent;

	get completed(): boolean {
		return this.data.completed;
	}

	handleChange(): void {
		this.store.changeEventStatus(this.data.id);
	}

	render() {
		const classNames: Array<string> = [styles.event];
		this.completed && classNames.push(styles.completed);

		return (
			<div class={classNames}>
				<input
					type="checkbox"
					id={this.data.id}
					class={styles.complete}
					onChange={this.handleChange}
					checked={this.completed}
				/>
				<span class={styles.description}>{this.data.body}</span>
			</div>
		);
	}
}
