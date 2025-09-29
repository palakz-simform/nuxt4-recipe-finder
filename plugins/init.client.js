export default defineNuxtPlugin(() => {
  // Client-side only initialization
  if (process.client) {
    // Initialize any client-side only features here
    console.log('Recipe Finder app initialized')
  }
})
