<script setup lang="ts">
import AddEvent from '@/components/addEvent.vue'
import eventList from '@/components/eventList.vue'
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4 m-2">
        <div class="card m-4">
          <div class="card-body">
            <AddEvent />
            <eventList />
          </div>
        </div>
      </div>
      <div class="col-md-8"></div>
    </div>
  </div>
</template>
