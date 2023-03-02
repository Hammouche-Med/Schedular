<script setup lang="ts">
import { useEventStore } from '@/stores/eventStore'
import { useLoadingStore } from '@/stores/loader.store'
const eventStore = useEventStore()
const loaderStore = useLoadingStore()

const handleDelete = async (id: number) => {
  loaderStore.setLoading(true)
  setTimeout(() => {
    eventStore.removeEvent(id)
    loaderStore.setLoading(false)
  }, 1000)
}
</script>
<template>
  <ul v-if="eventStore.events.length > 0" class="list-group">
    <li
      v-for="e in eventStore.events"
      :key="e.id"
      class="list-group-item d-flex justify-content-between rounded-pill border border-info m-2"
      draggable="true"
    >
      {{ e.title }}

      <button @click="handleDelete(e.id)" class="badge bg-danger rounded-pill">X</button>
    </li>
  </ul>

  <ul v-else class="list-group">
    <li class="list-group-item rounded-pill border border-info m-2" draggable="true">
      No Events :/
    </li>
  </ul>
</template>
