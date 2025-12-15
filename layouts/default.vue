<template>
    <div class="grid grid-cols-12 min-h-screen bg-gray-100">
      
      <aside class="col-span-3 bg-white border-r border-gray-200 shadow-lg p-4 h-full">
        <h1 class="text-2xl font-bold text-green-700 mb-4">Sidebar Filters</h1>
        <p class="text-gray-500 mt-3">-- Authentication and Filters go here --</p>
      </aside>
      
      <main class="col-span-9 h-full">
        <slot /> 
      </main>
  
    </div>
  </template>