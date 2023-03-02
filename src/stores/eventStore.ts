import { defineStore } from 'pinia'

export interface Event {
  id: number
  title: string
  start: string
  end: string
  allDay: boolean
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
    async getEvent(id: number | undefined) {
      if (id != undefined) return this.events.find((event) => event.id == id)
    },
    async addEvent(event: Event) {
      return this.events.push(event)
    },
    async removeEvent(id: number | undefined) {
      this.events = this.events.filter((event) => event.id != id)
    },
    async updateEvent(id: number | undefined, data: Event) {
      this.events = this.events.map((event) => (event.id !== id ? event : data))
    },
    async resetDraft() {
      this.draftEvent = {} as Event
    }
  },
  persist: {
    enabled: true
  }
})
