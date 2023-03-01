<script setup lang="ts">
import AddEvent from '@/components/addEvent.vue'
import eventList from '@/components/eventList.vue'
import calanderView from '@/components/calanderView.vue'
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <div class="card mt-2">
          <div class="card-body">
            <AddEvent />
            <eventList />
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <div class="card mt-2">
          <div class="card-body">
            <calanderView />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
