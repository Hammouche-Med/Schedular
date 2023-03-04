<script setup lang="ts">
import { useEventStore } from '@/stores/eventStore'
import { useLoadingStore } from '@/stores/loader.store'
import { ref } from 'vue'
import { Draggable } from '@fullcalendar/interaction'

//load the event store
const eventStore = useEventStore()

//load the loader store (no pun intended)
const loaderStore = useLoadingStore()

//store new event title
const newEventTitle = ref('')

//make the external events accessible for the calander
const updateDrragList = () => {
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
}

//creating an event handler function
const handleSubmit = () => {
  //filter empty strings
  if (newEventTitle.value === '') return
  loaderStore.setLoading(true)
  setTimeout(() => {
    eventStore.addEvent({
      //generate random id string
      id: (Math.random() + 1).toString(36).substring(7),
      title: newEventTitle.value,
      start: '',
      end: '',
      allDay: true,
      on_cal: false
    })
    newEventTitle.value = ''
    loaderStore.setLoading(false)
  }, 500)

  //call update drag list manualy cause on mount usualy the draggable list empty
  if (eventStore.events.length == 1) updateDrragList()
}
</script>
<template>
  <form @submit.prevent="handleSubmit" class="form-inline m-2">
    <div class="input-group">
      <input
        id="new-event"
        type="text"
        class="form-control"
        placeholder="Event Title"
        v-model="newEventTitle"
      />
      <div class="input-group-append">
        <button type="submit" class="btn btn-primary btn-load">
          <span v-if="!loaderStore.isLoading">+</span>
          <div v-else class="spinner-border spinner-border-sm" role="status">
            <span class="sr-only"></span>
          </div>
        </button>
      </div>
    </div>
  </form>
</template>
