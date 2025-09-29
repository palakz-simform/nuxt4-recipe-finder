<template>
  <div>
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
      <div class="max-w-4xl mx-auto text-center px-4">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          Discover Amazing Recipes
        </h1>
        <p class="text-xl mb-8 text-blue-100">
          Explore thousands of delicious recipes from around the world. Search by name, browse categories, and discover new flavors.
        </p>
        
        <SearchBox
          ref="searchBoxRef"
        />
      </div>
    </div>

    <!-- Featured Recipes -->
    <div class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            {{ recipeStore.searchFilters.query ? 'Search Results' : 'Featured Recipes' }}
          </h2>
          <p class="text-gray-600">
            {{ recipeStore.searchFilters.query 
              ? `Found ${recipeStore.meals.length} recipes for "${recipeStore.searchFilters.query}"`
              : 'Try these delicious recipes handpicked for you' 
            }}
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="isInitialLoading || recipeStore.isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        <!-- Recipes Grid -->
        <div v-else-if="!isInitialLoading && recipeStore.meals.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RecipeCard 
            v-for="meal in recipeStore.meals"
            :key="meal.idMeal"
            :meal="meal"
          />
        </div>

        <!-- Error State -->
        <div v-else-if="!isInitialLoading && recipeStore.error" class="text-center py-12">
          <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
          <h2 class="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
          <p class="text-gray-600 mb-6">{{ recipeStore.error }}</p>
          <button 
            @click="recipeStore.searchFilters.query ? handleSearch(recipeStore.searchFilters.query) : loadRandomRecipes()"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>

        <!-- Empty State -->
        <div v-else-if="!isInitialLoading && hasInitialized && !recipeStore.meals.length" class="text-center py-12">
          <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <h2 class="text-xl font-semibold text-gray-900 mb-2">
            {{ recipeStore.searchFilters.query ? 'No recipes found' : 'No recipes available' }}
          </h2>
          <p class="text-gray-600 mb-6">
            {{ recipeStore.searchFilters.query 
              ? `Try searching for a different recipe or browse categories.`
              : 'Check back later for new recipes.' 
            }}
          </p>
          <div class="flex gap-4 justify-center">
            <NuxtLink 
              to="/categories"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Browse Categories
            </NuxtLink>
            <button 
              v-if="recipeStore.searchFilters.query"
              @click="handleClearSearch"
              class="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
            >
              Clear Search
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// SEO and Meta
useSeoMeta({
  title: 'Recipe Finder - Discover Amazing Recipes',
  ogTitle: 'Recipe Finder - Discover Amazing Recipes',
  description: 'Explore thousands of delicious recipes from around the world. Search by name, browse categories, and discover new flavors.',
  ogDescription: 'Explore thousands of delicious recipes from around the world. Search by name, browse categories, and discover new flavors.',
})

const recipeStore = useRecipeStore()
const searchBoxRef = ref()
const hasInitialized = ref(false)
const isInitialLoading = ref(true)

// Fetch initial data
onMounted(async () => {
  isInitialLoading.value = true
  await Promise.all([
    loadRandomRecipes()
  ])
  isInitialLoading.value = false
  hasInitialized.value = true
})

const loadRandomRecipes = async () => {
  await recipeStore.fetchRandomMeals(6)
}
</script>
