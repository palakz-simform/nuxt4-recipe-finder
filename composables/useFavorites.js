import { ref, readonly, onMounted } from 'vue'

export const useFavorites = () => {
  const favorites = ref([])

  // Initialize from localStorage on client side
  onMounted(() => {
    const stored = localStorage.getItem('recipe-favorites')
    if (stored) {
      favorites.value = JSON.parse(stored)
    }
  })

  const addToFavorites = (mealId) => {
    if (!favorites.value.includes(mealId)) {
      favorites.value.push(mealId)
      updateLocalStorage()
    }
  }

  const removeFromFavorites = (mealId) => {
    const index = favorites.value.indexOf(mealId)
    if (index > -1) {
      favorites.value.splice(index, 1)
      updateLocalStorage()
    }
  }

  const toggleFavorite = (mealId) => {
    if (isFavorite(mealId)) {
      removeFromFavorites(mealId)
    } else {
      addToFavorites(mealId)
    }
  }

  const isFavorite = (mealId) => {
    return favorites.value.includes(mealId)
  }

  const updateLocalStorage = () => {
    localStorage.setItem('recipe-favorites', JSON.stringify(favorites.value))
  }

  return {
    favorites: readonly(favorites),
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite
  }
}
