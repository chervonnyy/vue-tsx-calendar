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

  handleChange(event: Event): void {
    this.store.addNewEvent((event.target as HTMLInputElement).value);
    (event.target as HTMLInputElement).value = '';
  }

  render() {
    return (
      <div class={styles.container}>
        <h2 class={styles.title}>
					Events
        </h2>
        <div class={styles.todos}>
          {this.store.plansForTheDay.map((todo: PlannedEvent) => (
            <EventItem data={todo} />
          ))}
        </div>
        <input
          type="text"
          placeholder="New event"
          class={styles.input}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
