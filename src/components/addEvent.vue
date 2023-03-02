<script setup lang="ts">
import { useEventStore } from '@/stores/eventStore'
import { useLoadingStore } from '@/stores/loader.store'
import { ref } from 'vue'

const eventStore = useEventStore()
const loaderStore = useLoadingStore()
const newEventTitle = ref('')

const handleSubmit = () => {
  if (newEventTitle.value === '') return
  loaderStore.setLoading(true)
  setTimeout(() => {
    eventStore.addEvent({
      id: Math.random() * 100,
      title: newEventTitle.value,
      start: '',
      end: '',
      allDay: true
    })
    newEventTitle.value = ''
    loaderStore.setLoading(false)
    console.log(eventStore.events)
  }, 1000)
}
</script>
<template>
  <form @submit.prevent="handleSubmit" class="form-inline m-2">
    <div class="input-group">
      <input
        id="new-event"
        type="text"
        class="form-control rounded-pill"
        placeholder="Event Title"
        v-model="newEventTitle"
      />
      <div class="input-group-append">
        <button type="submit" class="btn rounded-circle btn-primary btn-load">
          <span v-if="!loaderStore.isLoading">+</span>
          <div v-else class="spinner-border spinner-border-sm" role="status">
            <span class="sr-only"></span>
          </div>
        </button>
      </div>
    </div>
  </form>
</template>
