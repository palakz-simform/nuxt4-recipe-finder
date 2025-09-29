<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Recipe Categories</h1>
      <p class="text-gray-600">
        Explore our collection of recipes organized by category. From appetizers to desserts, 
        find exactly what you're craving.
      </p>
    </div>

    <CategoryGrid
      :categories="recipeStore.categories"
      :is-loading="recipeStore.isLoading"
      :error="recipeStore.error"
      @category-selected="handleCategorySelected"
      @retry="fetchCategories"
    />
  </div>
</template>

<script setup>
// SEO Meta
useSeoMeta({
  title: 'Recipe Categories - Recipe Finder',
  description: 'Browse recipes by category. Find appetizers, main courses, desserts, beverages and more organized categories.'
})

const recipeStore = useRecipeStore()

onMounted(async () => {
  await fetchCategories()
})

const fetchCategories = async () => {
  await recipeStore.fetchCategories()
}

const handleCategorySelected = (category) => {
  navigateTo(`/category/${category}`)
}
</script>
