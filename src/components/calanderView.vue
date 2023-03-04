<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { ref } from 'vue'
import { useEventStore } from '@/stores/eventStore'
import { useLoadingStore } from '@/stores/loader.store'
import Swal from 'sweetalert2'

//load the event store
const eventStore = useEventStore()

//load the loader store (no pun intended)
const loaderStore = useLoadingStore()

//used to reload component after change
const calendarKey = ref(1)

//handle the event delete from the calendar
const handleDelete = async (e: any) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      loaderStore.setLoading(true)
      setTimeout(() => {
        eventStore.removeEvent(e.event.id)
        loaderStore.setLoading(false)
        calendarKey.value += 1
      }, 500)
      Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
    }
  })
}

//specify options for calander and event handelers
const calendarOptions = {
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
  eventClick: (e: any) => {
    handleDelete(e)
  },
  eventChange: (e: any) => {
    eventStore.updateEvent(e.event.id, {
      id: e.event.id,
      title: e.event.title,
      start: e.event.startStr,
      end: e.event.endStr,
      allDay: true,
      on_cal: true
    })
  },
  eventReceive: (e: any) => {
    eventStore.updateEvent(e.event.id, {
      id: e.event.id,
      title: e.draggedEl.title,
      start: e.event.startStr,
      end: e.event.endStr,
      allDay: true,
      on_cal: true
    })
    document.getElementById(e.event.id)?.classList.remove('fc-event')
  }
}
</script>
<template>
  <FullCalendar
    id="mycalendar"
    :key="calendarKey"
    :events="eventStore.events"
    :options="calendarOptions"
  />
</template>
