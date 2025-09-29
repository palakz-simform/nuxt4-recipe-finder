<template>
  <div class="search-container">
    <form @submit.prevent="handleSearch" class="flex gap-2">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search for recipes..."
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1 text-gray-600 placeholder-gray-500"
      >
      <button 
        type="submit"
        :disabled="isLoading"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
      >
        <svg v-if="isLoading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        Search
      </button>
    </form>
    
    <div v-if="searchQuery" class="mt-2 flex items-center justify-between">
      <p class="text-sm text-gray-600">
        Showing results for: <strong>{{ searchQuery }}</strong>
      </p>
      <button 
        @click="clearSearch"
        class="text-sm text-gray-500 hover:text-gray-700 underline"
      >
        Clear search
      </button>
    </div>
  </div>
</template>

<script setup>
const recipeStore = useRecipeStore()
const searchQuery = ref('')
const isLoading = ref(false)

const handleSearch = async () => {
  if (searchQuery.value.trim()) {
    isLoading.value = true
    await recipeStore.searchMeals(searchQuery.value.trim())
    isLoading.value = false
  }
}

const clearSearch = () => {
  searchQuery.value = ''
  recipeStore.clearSearch()
}

defineExpose({
  setLoading: (loading) => {
    isLoading.value = loading
  }
})
</script>
