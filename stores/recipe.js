import { defineStore } from 'pinia'

export const useRecipeStore = defineStore('recipe', () => {
  // State
  const meals = ref([])
  const categories = ref([])
  const selectedMeal = ref(null)
  const isLoading = ref(false)
  const error = ref(null)
  const searchFilters = ref({})

  // Getters
  const featuredMeals = computed(() => meals.value.slice(0, 6))
  const mealsByCategory = computed(() => {
    if (!searchFilters.value.category) return meals.value
    return meals.value.filter(meal => meal.strCategory === searchFilters.value.category)
  })

  // Actions
  async function fetchCategories() {
    try {
      isLoading.value = true
      error.value = null
      const { data } = await $fetch('/api/categories')
      categories.value = data.categories
    } catch (err) {
      error.value = 'Failed to fetch categories'
      console.error('Error fetching categories:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function searchMeals(query) {
    try {
      isLoading.value = true
      error.value = null
      const { data } = await $fetch(`/api/search?q=${encodeURIComponent(query)}`)
      meals.value = data.meals || []
      searchFilters.value.query = query
    } catch (err) {
      error.value = 'Failed to search meals'
      console.error('Error searching meals:', err)
      meals.value = []
    } finally {
      isLoading.value = false
    }
  }

  async function fetchMealsByCategory(category) {
    try {
      isLoading.value = true
      error.value = null
      const { data } = await $fetch(`/api/category/${category}`)
      meals.value = data.meals || []
      searchFilters.value = { category }
    } catch (err) {
      error.value = 'Failed to fetch meals by category'
      console.error('Error fetching meals by category:', err)
      meals.value = []
    } finally {
      isLoading.value = false
    }
  }

  async function fetchRandomMeals(count = 6) {
    try {
      isLoading.value = true
      error.value = null
      const promises = Array(count).fill(null).map(() =>
        $fetch('/api/random')
      )
      const results = await Promise.all(promises)
      meals.value = results.map(result => result.data.meals[0]).filter(Boolean)
    } catch (err) {
      error.value = 'Failed to fetch random meals'
      console.error('Error fetching random meals:', err)
      meals.value = []
    } finally {
      isLoading.value = false
    }
  }

  async function fetchMealById(id) {
    try {
      isLoading.value = true
      error.value = null
      const { data } = await $fetch(`/api/meal/${id}`)
      selectedMeal.value = data.meals?.[0] || null
      return selectedMeal.value
    } catch (err) {
      error.value = 'Failed to fetch meal details'
      console.error('Error fetching meal by id:', err)
      selectedMeal.value = null
      return null
    } finally {
      isLoading.value = false
    }
  }

  function clearSearch() {
    meals.value = []
    searchFilters.value = {}
    error.value = null
  }

  function setSelectedMeal(meal) {
    selectedMeal.value = meal
  }

  return {
    // State
    meals,
    categories,
    selectedMeal,
    isLoading,
    error,
    searchFilters,

    // Getters
    featuredMeals,
    mealsByCategory,

    // Actions
    fetchCategories,
    searchMeals,
    fetchMealsByCategory,
    fetchRandomMeals,
    fetchMealById,
    clearSearch,
    setSelectedMeal
  }
})