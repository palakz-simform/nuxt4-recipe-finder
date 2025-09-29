export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  try {
    const response = await fetch(`${config.public.apiBase}/random.php`)
    const data = await response.json()
    
    return {
      data,
      success: true
    }
  } catch (error) {
    console.error('Error fetching random meal:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch random meal'
    })
  }
})
