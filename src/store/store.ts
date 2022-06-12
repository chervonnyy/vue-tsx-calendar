import {
  State, Getter, Mutation, Action,
} from 'vuex-simple';
import { PlannedEvent, Todo } from '@/types';

export default class myStore {
    @State()
  public activeDay: number;

    public events: Array<PlannedEvent> = [];

    constructor(day: number = new Date().getDate()) {
      this.activeDay = day;
    }

    @Getter()
    public get day(): number {
      return this.activeDay;
    }

    public get plannedDays(): Array<number> {
      return this.events.map((event) => event.date);
    }

    public get plansForTheDay(): Array<PlannedEvent> {
      return this.events.filter((event) => event.date === this.day);
    }

    @Mutation()
    public changeActiveDay(day: number): void {
      this.activeDay = day;
    }

    public setEvents(events: Array<PlannedEvent>) {
      this.events = events;
    }

    public addNewEvent(body: string): void {
      this.events.push({
        id: Date.now(),
        body,
        completed: false,
        date: this.day,
      });
    }

    public changeEventStatus(id: number): void {
      const currentEvent: PlannedEvent | undefined = this.events.find((event) => event.id === id);
      if (currentEvent) currentEvent.completed = !currentEvent.completed;
    }

    @Action()
    async getEvents() {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
      const todos = await response.json();
      // not sure what to do with this map callback
      const events: Array<PlannedEvent> = todos.map((todo: Todo) => ({
        id: todo.id,
        body: todo.title.substring(0, 1).toUpperCase() + todo.title.substring(1, 30),
        completed: todo.completed,
        date: Math.floor(Math.random() * 27 + 1),
      }));

      this.setEvents(events);
    }
}
