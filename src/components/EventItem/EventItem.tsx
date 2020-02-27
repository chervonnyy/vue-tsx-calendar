import { Component, Prop } from 'vue-property-decorator';
import { VueComponent } from '../../shims-vue';
import { useStore } from 'vuex-simple';
import MyStore from '@/store/store';
import { PlannedEvent } from '@/types';

import styles from './EventItem.css?module'; 

@Component
export default class EventItem extends VueComponent {

	public store: MyStore = useStore(this.$store);

	@Prop()
	data!: PlannedEvent

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
