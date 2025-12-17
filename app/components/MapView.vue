<template>
  <div class="flex-1 relative bg-blue-50 h-full w-full">
    
    <button 
      @click="onToggleClick"
      class="absolute top-4 left-4 z-10 bg-white px-3 py-2 shadow-md rounded-md cursor-pointer hover:bg-gray-100 flex items-center gap-2 transition-colors select-none text-gray-700 border border-gray-200"
    >
      <span class="font-bold text-lg leading-none pb-1 text-gray-500">
        {{ isSidebarOpen ? '«' : '»' }}
      </span>
      <span class="text-sm font-medium">
        {{ isSidebarOpen ? 'Hide bar' : 'Show filters' }}
      </span>
    </button>

    <div class="absolute top-4 right-4 z-10 flex flex-col gap-2">
       <button class="bg-white w-8 h-8 flex items-center justify-center shadow rounded hover:bg-gray-50 text-gray-600 font-bold text-xl">+</button>
       <button class="bg-white w-8 h-8 flex items-center justify-center shadow rounded hover:bg-gray-50 text-gray-600 font-bold text-xl">-</button>
    </div>

    <GMapMap 
        :center="{ lat: 20, lng: 0 }" 
        :zoom="2" 
        :options="{ mapTypeControl: false, streetViewControl: false, fullscreenControl: false, zoomControl: false }"
        style="width: 100%; height: 100%"
    >
      <GMapMarker
        v-for="(d, index) in limitedDeployments"
        :key="d.deployment_id + '_' + index"
        :position="{ lat: d.lat, lng: d.lng }"
        :clickable="true"
      />
    </GMapMap>
  </div>
</template>

<script setup>
import { computed } from 'vue'


const props = defineProps({
  deployments: Array,
  isSidebarOpen: { type: Boolean, default: true }
})

// สำคัญ: ต้อง defineEmits เพื่อบอก Vue ว่าปุ่มนี้ส่ง event ได้
const emit = defineEmits(['toggle-sidebar'])

function onToggleClick() {
  emit('toggle-sidebar') // ส่งสัญญาณไปหาตัวแม่
}

const limitedDeployments = computed(() => props.deployments ? props.deployments.slice(0, 1000) : [])
</script>