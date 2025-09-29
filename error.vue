<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 text-center">
      <div>
        <h1 class="text-9xl font-bold text-gray-300">{{ error.statusCode }}</h1>
        <h2 class="mt-6 text-3xl font-bold text-gray-900">
          {{ error.statusCode === 404 ? 'Page Not Found' : 'Something went wrong' }}
        </h2>
        <p class="mt-2 text-gray-600">
          {{ error.statusMessage || (error.statusCode === 404 
            ? "The page you're looking for doesn't exist." 
            : "We're sorry, something unexpected happened.") 
          }}
        </p>
      </div>
      
      <div class="space-y-4">
        <NuxtLink to="/" class="btn-primary inline-flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          Go Home
        </NuxtLink>
        
        <button 
          @click="$router.back()"
          class="btn-secondary ml-4 inline-flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Go Back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta } from 'nuxt/app'   
interface Props {
  error: {
    statusCode: number
    statusMessage?: string
  }
}

defineProps<Props>()

// Set page meta
useSeoMeta({
  title: 'Error - Recipe Finder',
  description: 'An error occurred while loading the page.'
})
</script>
