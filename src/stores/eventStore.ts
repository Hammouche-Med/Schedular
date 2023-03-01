import { defineStore } from 'pinia'

export interface Event {
  id: string
  title: string
  start: string
  end: string
  allDay: string
}

export const useEventStore = defineStore('event', {
  state: () => {
    return {
      events: [] as Event[],
      draftEvent: {} as Event
    }
  },
  actions: {
    getEvents() {
      return this.events
    },
    setEvents(list: Event[]) {
      this.events = list
    },
    getEvent(id: string | undefined) {
      if (id != undefined) return this.events.find((event) => event.id == id)
    },
    addEvent(event: Event) {
      return this.events.push(event)
    },
    removeEvent(id: string | undefined) {
      this.events = this.events.filter((event) => event.id != id)
    },
    updateEvent(id: string | undefined, data: Event) {
      this.events = this.events.map((event) => (event.id !== id ? event : data))
    },
    resetDraft() {
      this.draftEvent = {} as Event
    }
  },
  persist: {
    enabled: true
  }
})
