export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const searchQuery = query.q
  
  if (!searchQuery) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Search query is required'
    })
  }
  
  try {
    const response = await fetch(`${config.public.apiBase}/search.php?s=${encodeURIComponent(searchQuery)}`)
    const data = await response.json()
    
    return {
      data,
      success: true
    }
  } catch (error) {
    console.error('Error searching meals:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to search meals'
    })
  }
})
