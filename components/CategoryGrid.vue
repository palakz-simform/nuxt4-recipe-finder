<template>
  <div class="categories-grid">
    <h3 class="text-xl font-bold mb-4">Browse by Category</h3>
    
    <div v-if="isLoading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div 
        v-for="i in 8" 
        :key="i"
        class="bg-white rounded-lg shadow-md p-4 animate-pulse"
      >
        <div class="w-full h-20 bg-gray-300 rounded mb-3"></div>
        <div class="h-4 bg-gray-300 rounded mb-2"></div>
        <div class="h-3 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
    
    <div 
      v-else-if="categories.length"
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <button
        v-for="category in categories"
        :key="category.idCategory"
        @click="$emit('categorySelected', category.strCategory)"
        class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 text-left group"
      >
        <img 
          :src="category.strCategoryThumb"
          :alt="category.strCategory"
          class="w-full h-20 object-cover rounded mb-3 group-hover:scale-105 transition-transform"
        >
        <h4 class="font-semibold mb-1">{{ category.strCategory }}</h4>
        <p class="text-sm text-gray-600 line-clamp-2">
          {{ category.strCategoryDescription }}
        </p>
      </button>
    </div>
    
    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-600 mb-2">{{ error }}</p>
      <button @click="$emit('retry')" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
        Try Again
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '../types'

interface Props {
  categories: Category[]
  isLoading: boolean
  error: string | null
}

interface Emits {
  (e: 'categorySelected', category: string): void
  (e: 'retry'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
