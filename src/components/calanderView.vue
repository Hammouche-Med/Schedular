<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import { onMounted, reactive } from 'vue'
import { useEventStore } from '@/stores/eventStore'

const eventStore = useEventStore()

const calendarOptions = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  editable: true,
  droppable: true,
  weekends: true,
  dropAccept: '.fc-event',
  drop: (e: any) => {
    console.log('drop-----', e)
  },
  select: (e: any) => {
    console.log('select-----', e)
  },
  eventClick: (e: any) => {
    console.log('event-click-----', e)
  },
  eventAdd: (e: any) => {
    console.log('add-----', e)
  },
  eventChange: (e: any) => {
    console.log('upd-----', e)
    eventStore.updateEvent(e.event.id, {
      id: e.event.id,
      title: e.event.title,
      start: e.event.startStr,
      end: e.event.endStr,
      allDay: true,
      on_cal: true
    })
  },
  eventRemove: (e: any) => {
    console.log('del-----', e)
  },
  eventReceive: (e: any) => {
    console.log('rec-----', e)
    eventStore.updateEvent(e.event.id, {
      id: e.event.id,
      title: e.draggedEl.title,
      start: e.event.startStr,
      end: e.event.endStr,
      allDay: true,
      on_cal: true
    })
    document.getElementById(e.event.id)?.classList.remove('fc-event')
  },
  events: eventStore.events
})

onMounted(() => {
  const container = document.getElementById('fc-events-list')
  if (container)
    new Draggable(container, {
      itemSelector: '.fc-event',
      eventData: (e_El) => {
        return {
          id: e_El.id,
          title: e_El.title,
          slot: e_El.slot
        }
      }
    })
})
</script>
<template>
  <FullCalendar id="mycalendar" :options="calendarOptions" />
</template>
