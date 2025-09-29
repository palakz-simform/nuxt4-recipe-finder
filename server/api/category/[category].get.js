export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const category = getRouterParam(event, 'category')
  
  if (!category) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Category parameter is required'
    })
  }
  
  try {
    const response = await fetch(`${config.public.apiBase}/filter.php?c=${encodeURIComponent(category)}`)
    const data = await response.json()
    
    return {
      data,
      success: true
    }
  } catch (error) {
    console.error('Error fetching meals by category:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch meals by category'
    })
  }
})
