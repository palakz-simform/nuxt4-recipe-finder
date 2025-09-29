<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-gray-900">My Favorite Recipes</h1>
      <NuxtLink to="/" class="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200">
        ← Back to Home
      </NuxtLink>
    </div>

    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="i in 6" 
        :key="i"
        class="bg-white rounded-lg shadow-md animate-pulse"
      >
        <div class="h-48 bg-gray-300 rounded-t-lg"></div>
        <div class="p-4">
          <div class="h-4 bg-gray-300 rounded mb-2"></div>
          <div class="h-3 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div class="h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>

    <div v-else-if="favoriteMeals.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <RecipeCard 
        v-for="meal in favoriteMeals"
        :key="meal.idMeal"
        :meal="meal"
      />
    </div>

    <div v-else class="text-center py-12">
      <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
      </svg>
      <h2 class="text-xl font-semibold text-gray-900 mb-2">No favorites yet</h2>
      <p class="text-gray-600 mb-6">Start exploring recipes and add them to your favorites!</p>
      <NuxtLink to="/" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
        Browse Recipes
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useSeoMeta } from '#app'
import { useFavorites } from '../composables/useFavorites'

// SEO Meta
useSeoMeta({
  title: 'My Favorite Recipes - Recipe Finder',
  description: 'View all your favorite recipes in one place. Keep track of your most loved dishes.'
})

const { favorites } = useFavorites()
const favoriteMeals = ref([])
const isLoading = ref(false)

// Fetch favorite meals details
const fetchFavoriteMeals = async () => {
  if (favorites.value.length === 0) return
  
  isLoading.value = true
  try {
    const promises = favorites.value.map(id => 
      $fetch(`/api/meal/${id}`)
    )
    const results = await Promise.all(promises)
    favoriteMeals.value = results
      .map(result => result.data.meals?.[0])
      .filter((meal) => meal !== undefined)
  } catch (error) {
    console.error('Error fetching favorite meals:', error)
  } finally {
    isLoading.value = false
  }
}

// Watch favorites and refetch when they change
watch(() => favorites.value, fetchFavoriteMeals, { immediate: true })

onMounted(() => {
  fetchFavoriteMeals()
})
</script>
