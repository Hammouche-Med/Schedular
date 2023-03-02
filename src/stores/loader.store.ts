import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore(
  'loading',
  () => {
    const isLoading = ref(false)

    const setLoading = (state: boolean) => {
      isLoading.value = state
    }

    return { isLoading, setLoading }
  },
  {}
)
