export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  try {
    const response = await fetch(`${config.public.apiBase}/categories.php`)
    const data = await response.json()
    
    return {
      data,
      success: true
    }
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch categories'
    })
  }
})
