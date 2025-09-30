<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">
          {{ category ? `${category} Recipes` : 'All Categories' }}
        </h1>
        <p class="mt-2 text-gray-600">
          {{ category ? `Browse all recipes in the ${category} category` : 'Explore all recipe categories' }}
        </p>
      </div>
      
      <NuxtLink to="/" class="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200">
        ← Back to Home
      </NuxtLink>
    </div>

    <!-- Category Recipes -->
    <div v-if="category">
      <div v-if="mealsPending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="i in 9" 
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
      
      <div v-else-if="mealsData?.data?.meals?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RecipeCard 
          v-for="meal in mealsData.data.meals"
          :key="meal.idMeal"
          :meal="meal"
        />
      </div>
      
      <div v-else-if="mealsError" class="text-center py-12">
        <p class="text-red-600 mb-4">{{ mealsError.message || 'Failed to load recipes' }}</p>
        <button @click="fetchMeals" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
          Try Again
        </button>
      </div>
      
      <div v-else class="text-center py-12">
        <p class="text-gray-600">No recipes found in this category.</p>
      </div>
    </div>

    <!-- All Categories Grid -->
    <div v-else>
      <CategoryGrid
        :categories="recipeStore.categories"
        :is-loading="recipeStore.isLoading"
        :error="recipeStore.error"
        @category-selected="handleCategorySelected"
        @retry="fetchCategories"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
const route = useRoute()
const recipeStore = useRecipeStore()

const category = computed(() => route.params.category)
const categoryUrl = computed(() => category.value ? `/api/category/${category.value}` : null)

const { data: mealsData, pending: mealsPending, error: mealsError, refresh: refreshMeals } = useFetch(categoryUrl, { immediate: false })

// SEO Meta
useSeoMeta({
  title: () => category.value ? `${category.value} Recipes - Recipe Finder` : 'All Categories - Recipe Finder',
  description: () => category.value 
    ? `Browse all ${category.value} recipes. Discover delicious ${category.value} dishes from around the world.`
    : 'Explore all recipe categories. Find recipes by category including desserts, main courses, appetizers and more.'
})

const fetchMeals = async () => {
  if (category.value) {
    await refreshMeals()
  }
}

const fetchCategories = async () => {
  await recipeStore.fetchCategories()
}

// Watch for category changes
watch(() => category.value, (newCategory) => {
  if (newCategory) {
    fetchMeals()
  } else {
    fetchCategories()
  }
}, { immediate: true })

const handleCategorySelected = (selectedCategory) => {
  navigateTo(`/category/${selectedCategory}`)
}
</script>
