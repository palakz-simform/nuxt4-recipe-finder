<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <div class="relative">
      <img 
        :src="meal.strMealThumb" 
        :alt="meal.strMeal"
        class="w-full h-48 object-cover"
        loading="lazy"
      >
      <button 
        @click="toggleFavorite(meal.idMeal)"
        class="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        :class="{ 'text-red-500': isFavorite(meal.idMeal), 'text-gray-400': !isFavorite(meal.idMeal) }"
      >
        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      </button>
    </div>
    
    <div class="p-4">
      <h3 class="font-bold text-lg mb-2 line-clamp-2">{{ meal.strMeal }}</h3>
      
      <p v-if="meal.strInstructions" class="text-gray-600 text-sm mb-4 line-clamp-3">
        {{ meal.strInstructions }}
      </p>
      
      <div class="flex items-center justify-between">
        <NuxtLink 
          :to="`/recipe/${meal.idMeal}`"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
        >
          View Recipe
        </NuxtLink>
        
        <a 
          v-if="meal.strYoutube"
          :href="meal.strYoutube"
          target="_blank"
          rel="noopener noreferrer"
          class="text-red-600 hover:text-red-700"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>

defineProps({
  meal: {
    type: Object,
    required: true
  }
})

const { toggleFavorite, isFavorite } = useFavorites()
</script>
