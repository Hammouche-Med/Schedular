<script setup lang="ts">
import { useEventStore } from '@/stores/eventStore'

//load the event store
const eventStore = useEventStore()
</script>
<template>
  <ul
    v-if="eventStore.events.length > 0"
    draggable
    class="list-group fc-events-list"
    id="fc-events-list"
  >
    <li
      v-for="e in eventStore.events"
      :key="e.id"
      class="list-group-item d-flex fc-event justify-content-between"
      draggable="true"
      :id="e.id"
      :title="e.title"
    >
      <div class="ms-2 me-auto">
        <div class="fw-bold">{{ e.title }}</div>
        <div v-if="e.start && e.end">
          {{ new Date(e.start).toLocaleString() }} - {{ new Date(e.end).toLocaleString() }}
        </div>
        <div v-if="e.start && !e.end">{{ new Date(e.start).toLocaleDateString() }}</div>
      </div>
    </li>
  </ul>

  <ul v-else class="list-group">
    <li class="list-group-item rounded-pill border border-info m-2" draggable="true">
      No Events :/
    </li>
  </ul>
</template>
