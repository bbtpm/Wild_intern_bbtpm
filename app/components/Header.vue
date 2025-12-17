<template>
  <header class="w-full bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-50">
    <div class="flex items-center">
      <img src="./src/assets/Wildlifelogo.png" alt="Wildlife Insights" class="h-8 mr-2" />
      <span class="text-xl font-bold text-gray-800 tracking-tight">Wildlife Insights</span>
    </div>

    <div class="flex items-center gap-6 text-sm font-medium text-gray-600">
      <a href="#" class="text-gray-900 border-b-2 border-green-500 pb-5 pt-5">Explore Data</a>
      
      <div class="flex items-center cursor-pointer">
        <span>Users</span>
        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
      </div>

      <button class="bg-green-300 hover:bg-green-400 text-green-900 px-6 py-2 rounded-full font-semibold transition-colors">
        Upload
      </button>
    </div>
  </header>
</template>

<script setup>
</script>