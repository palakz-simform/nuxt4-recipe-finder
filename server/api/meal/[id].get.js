export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')
  
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Meal ID parameter is required'
    })
  }
  
  try {
    const response = await fetch(`${config.public.apiBase}/lookup.php?i=${encodeURIComponent(id)}`)
    const data = await response.json()
    
    return {
      data,
      success: true
    }
  } catch (error) {
    console.error('Error fetching meal details:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch meal details'
    })
  }
})
