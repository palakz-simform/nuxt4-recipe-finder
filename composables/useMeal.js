
export const useMeal = () => {
  const formatIngredients = (meal) => {
    const ingredients = []
    
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`]
      const measure = meal[`strMeasure${i}`]
      
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure?.trim() || ''
        })
      }
    }
    
    return ingredients
  }

  const formatInstructions = (instructions) => {
    return instructions
      .split('\r\n')
      .filter(step => step.trim())
      .map((step, index) => ({
        step: index + 1,
        instruction: step.trim()
      }))
  }

  const getYouTubeVideoId = (url) => {
    if (!url) return null
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  const formatTags = (tags) => {
    if (!tags) return []
    return tags.split(',').map(tag => tag.trim()).filter(Boolean)
  }

  return {
    formatIngredients,
    formatInstructions,
    getYouTubeVideoId,
    formatTags
  }
}
