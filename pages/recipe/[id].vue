<template>
  <div>
    <!-- Loading State -->
    <div v-if="pending" class="animate-pulse">
      <div class="mb-8">
        <div class="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <div class="h-64 bg-gray-300 rounded-lg mb-6"></div>
          <div class="h-4 bg-gray-300 rounded mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div class="space-y-2">
            <div class="h-3 bg-gray-200 rounded"></div>
            <div class="h-3 bg-gray-200 rounded"></div>
            <div class="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
        
        <div class="space-y-4">
          <div class="h-6 bg-gray-300 rounded w-1/2"></div>
          <div v-for="i in 6" :key="i" class="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>

    <!-- Recipe Content -->
    <div v-else-if="meal" class="max-w-7xl mx-auto">
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-4">
            <button 
              @click="$router.back()"
              class="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200 flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Back
            </button>
            
            <button 
              @click="toggleFavorite(meal.idMeal)"
              class="flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors"
              :class="isFavorite(meal.idMeal) 
                ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' 
                : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'"
            >
              <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
              {{ isFavorite(meal.idMeal) ? 'Remove from Favorites' : 'Add to Favorites' }}
            </button>
          </div>
        </div>
        
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {{ meal.strMeal }}
        </h1>
        
        <div class="flex flex-wrap items-center gap-4 text-sm">
          <span class="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
            {{ meal.strCategory }}
          </span>
          <span class="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 font-medium">
            {{ meal.strArea }}
          </span>
          <div v-if="tags.length" class="flex flex-wrap gap-2">
            <span 
              v-for="tag in tags"
              :key="tag"
              class="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Image -->
          <div class="relative">
            <img 
              :src="meal.strMealThumb"
              :alt="meal.strMeal"
              class="w-full h-96 object-cover rounded-lg shadow-lg"
            >
            <div v-if="youtubeVideoId" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
              <a 
                :href="meal.strYoutube"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Watch Video
              </a>
            </div>
          </div>

          <!-- Instructions -->
          <div class="bg-white rounded-lg p-6 shadow-sm border">
            <h2 class="text-2xl font-bold mb-4">Instructions</h2>
            <ol class="space-y-4">
              <li 
                v-for="(instruction, index) in instructions"
                :key="index"
                class="flex gap-4"
              >
                <span class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {{ instruction.step }}
                </span>
                <p class="text-gray-700 leading-relaxed pt-1">
                  {{ instruction.instruction }}
                </p>
              </li>
            </ol>
          </div>

          <!-- Source Link -->
          <div v-if="meal.strSource" class="bg-gray-50 rounded-lg p-6">
            <h3 class="font-semibold mb-2">Original Recipe Source</h3>
            <a 
              :href="meal.strSource"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-600 hover:text-blue-700 underline break-all"
            >
              {{ meal.strSource }}
            </a>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Ingredients -->
          <div class="bg-white rounded-lg p-6 shadow-sm border">
            <h2 class="text-xl font-bold mb-4">Ingredients</h2>
            <ul class="space-y-3">
              <li 
                v-for="ingredient in ingredients"
                :key="ingredient.ingredient"
                class="flex justify-between items-start gap-3 py-2 border-b border-gray-100 last:border-0"
              >
                <span class="font-medium text-gray-900">{{ ingredient.ingredient }}</span>
                <span class="text-gray-600 text-sm text-right">{{ ingredient.measure || 'To taste' }}</span>
              </li>
            </ul>
          </div>

          <!-- YouTube Video Embed -->
          <div v-if="youtubeVideoId" class="bg-white rounded-lg p-6 shadow-sm border">
            <h3 class="text-lg font-bold mb-4">Video Tutorial</h3>
            <div class="aspect-w-16 aspect-h-9">
              <iframe 
                :src="`https://www.youtube.com/embed/${youtubeVideoId}`"
                :title="`${meal.strMeal} video tutorial`"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="w-full h-48 rounded border-0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else class="text-center py-12">
      <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"></path>
      </svg>
      <h2 class="text-xl font-semibold text-gray-900 mb-2">Recipe not found</h2>
      <p class="text-gray-600 mb-6">The recipe you're looking for doesn't exist or has been removed.</p>
      <NuxtLink to="/" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
        Browse Recipes
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSeoMeta, useRoute, useFetch } from '#app'
import { useMeal } from '../../composables/useMeal'
import { useFavorites } from '../../composables/useFavorites'
const route = useRoute()
const recipeId = route.params.id 

// Fetch recipe data
const { data: meal, pending } = await useFetch(`/api/meal/${recipeId}`, {
  transform: (data) => data.data.meals?.[0] || null
})

// SEO Meta
useSeoMeta({
  title: () => meal.value ? `${meal.value.strMeal} - Recipe Finder` : 'Recipe - Recipe Finder',
  description: () => meal.value 
    ? `Learn how to make ${meal.value.strMeal}. A delicious ${meal.value.strCategory} recipe from ${meal.value.strArea}.`
    : 'Discover this amazing recipe with step-by-step instructions.',
  ogImage: () => meal.value?.strMealThumb,
})

// Composables
const { formatIngredients, formatInstructions, getYouTubeVideoId, formatTags } = useMeal()
const { toggleFavorite, isFavorite } = useFavorites()

// Computed properties
const ingredients = computed(() => meal.value ? formatIngredients(meal.value) : [])
const instructions = computed(() => meal.value ? formatInstructions(meal.value.strInstructions) : [])
const youtubeVideoId = computed(() => getYouTubeVideoId(meal.value?.strYoutube))
const tags = computed(() => formatTags(meal.value?.strTags))
</script>
