import { Component } from 'vue-property-decorator';
import { useStore } from 'vuex-simple';
import { VueComponent } from '../../shims-vue';
import MyStore from '@/store/store';
import { PlannedEvent } from '@/types';

import EventItem from '../EventItem/EventItem';
import styles from './TodoForm.css?module';

@Component
export default class TodoForm extends VueComponent {
  public store: MyStore = useStore(this.$store);

  get todos() {
    return this.store.plansForTheDay.map((todo: PlannedEvent) => <EventItem data={todo} />);
  }

  handleChange(event: any): void {
    this.store.addNewEvent(event.target.value);
    event.target.value = '';
  }

  render() {
    return (
			<div class={styles.container}>
				<h2 class={styles.title}>
					События
				</h2>
				<div class={styles.todos}>
					{...this.todos}
				</div>
				<input
					type="text"
					placeholder="Новое событие"
					class={styles.input}
					onchange={this.handleChange}
				/>
			</div>
    );
  }
}
