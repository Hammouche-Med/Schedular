import { defineStore } from 'pinia'

export interface Event {
  id: string
  title: string
  start: string
  end: string
  allDay: boolean
  on_cal: boolean
}

export const useEventStore = defineStore('event', {
  state: () => {
    return {
      events: [] as Event[],
      draftEvent: {} as Event
    }
  },
  actions: {
    async getEvents() {
      return this.events
    },
    async setEvents(list: Event[]) {
      this.events = list
    },
    getEvent(id: string | undefined) {
      if (id != undefined) return this.events.find((event) => event.id == id)
    },
    async addEvent(event: Event) {
      return this.events.push(event)
    },
    async removeEvent(id: string | undefined) {
      this.events = this.events.filter((event) => event.id != id)
    },
    async updateEvent(id: string | undefined, data: Event) {
      this.events = this.events.map((event) => (event.id !== id ? event : data))
    }
  }
})
