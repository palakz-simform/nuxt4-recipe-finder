<template>
  <NuxtLink 
    :to="`/category/${category.strCategory}`"
    class="block bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
  >
    <div class="relative h-48 overflow-hidden">
      <img 
        :src="category.strCategoryThumb"
        :alt="category.strCategory"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        loading="lazy"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div class="absolute bottom-4 left-4 text-white">
        <h3 class="text-xl font-bold mb-1">{{ category.strCategory }}</h3>
        <p class="text-sm opacity-90">Explore recipes</p>
      </div>
    </div>
    
    <div class="p-4">
      <p class="text-gray-600 text-sm line-clamp-3">
        {{ category.strCategoryDescription }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  category: {
    type: Object,
    required: true
  }
})
</script>
