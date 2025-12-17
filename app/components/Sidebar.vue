<template>
  <div class="w-[500px] h-full bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
    
    <div class="p-8 pb-4">
      <div class="text-2xl text-gray-600 leading-relaxed font-light">
        Showing 
        
        <div class="inline-block relative group z-30">
          <select 
            v-model="localFilters.species"
            class="appearance-none bg-green-100 text-green-800 pl-3 pr-8 py-1 rounded font-medium border-none focus:ring-2 focus:ring-green-500 cursor-pointer hover:bg-green-200 transition-colors"
          >
            <option :value="null" disabled selected>any species</option>
            <!-- <option value="">(All Species)</option> -->
            <option v-for="species in speciesList" :key="species" :value="species">
              {{ species }}
            </option>
          </select>
           <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-green-800">
            <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
          </div>
        </div>

        in the 
        <div class="inline-block relative group z-20">
          <select 
            v-model="localFilters.country"
            class="appearance-none bg-green-100 text-green-800 pl-3 pr-8 py-1 rounded font-medium border-none focus:ring-2 focus:ring-green-500 cursor-pointer hover:bg-green-200 transition-colors max-w-[200px] truncate"
          >
            <option :value="null" disabled selected>whole world</option>
            <option :value="null">(Whole World)</option>
            <option v-for="country in countryList" :key="country" :value="country">
              {{ country }}
            </option>
          </select>
           <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-green-800">
            <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
          </div>
        </div> <br/>
        
        taken between
        <input type="date" v-model="localFilters.startDate" class="bg-green-100 text-green-800 px-2 py-1 rounded font-medium border-none focus:ring-2 focus:ring-green-500 cursor-pointer w-auto max-w-[140px]"/>
        and
        <input type="date" v-model="localFilters.endDate" class="bg-green-100 text-green-800 px-2 py-1 rounded font-medium border-none focus:ring-2 focus:ring-green-500 cursor-pointer w-auto max-w-[140px]"/>
        <br/>
        
        and part of
        <div class="inline-block relative mt-2 z-10">
          <select 
            v-model="localFilters.project"
            class="appearance-none bg-green-100 text-green-800 pl-3 pr-8 py-1 rounded font-medium border-none focus:ring-2 focus:ring-green-500 cursor-pointer hover:bg-green-200 transition-colors max-w-[250px] truncate"
          >
            <option :value="null" disabled selected>any project</option>
            <!-- <option :value="null">(All Projects)</option> -->
            <option v-for="proj in projectList" :key="proj.id" :value="proj.id">
              {{ proj.name }}
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-green-800">
            <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <button class="bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-green-200 transition">
          Advanced filters
        </button>
      </div>

      <p class="text-xs text-gray-500 mt-4 leading-relaxed">
        Results only include identifications that have been <span class="text-green-600 font-bold">verified</span> by the data provider.
      </p>
    </div>

    <div class="p-6 bg-white grid grid-cols-2 gap-4 pb-20">
       
       <div class="border rounded-lg p-4 shadow-sm relative hover:shadow-md transition bg-white">
          <div class="text-3xl font-bold text-gray-800 mb-1">{{ formatNumber(summary.species) }}</div>
          <div class="text-gray-500 text-sm font-medium">Species</div>
          <div class="absolute bottom-4 right-4 text-green-600">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.024c.026-.015.053-.03.078-.047.26-.18.796-.646.796-1.201 0-.74-.83-1.077-1.445-.78-1.146.573-2.437-.463-2.126-1.706l.709-2.836-.042.024c-.026.015-.053.03-.078.047-.26.18-.796.646-.796 1.201 0 .74.83 1.077 1.445.78zM12 6.75a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" /></svg>
          </div>
       </div>

       <div class="border rounded-lg p-4 shadow-sm relative hover:shadow-md transition bg-white">
          <div class="text-3xl font-bold text-gray-800 mb-1">{{ formatNumber(summary.projects) }}</div>
          <div class="text-gray-500 text-sm font-medium">Projects</div>
          <div class="absolute bottom-4 right-4 text-green-600">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.024c.026-.015.053-.03.078-.047.26-.18.796-.646.796-1.201 0-.74-.83-1.077-1.445-.78-1.146.573-2.437-.463-2.126-1.706l.709-2.836-.042.024c-.026.015-.053.03-.078.047-.26.18-.796.646-.796 1.201 0 .74.83 1.077 1.445.78zM12 6.75a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" /></svg>
          </div>
       </div>

       <div class="border rounded-lg p-4 shadow-sm relative hover:shadow-md transition bg-white">
          <div class="text-3xl font-bold text-gray-800 mb-1">{{ formatNumber(summary.images) }}</div>
          <div class="text-gray-500 text-sm font-medium">Images</div>
          <div class="absolute bottom-4 right-4 text-green-600">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.024c.026-.015.053-.03.078-.047.26-.18.796-.646.796-1.201 0-.74-.83-1.077-1.445-.78-1.146.573-2.437-.463-2.126-1.706l.709-2.836-.042.024c-.026.015-.053.03-.078.047-.26.18-.796.646-.796 1.201 0 .74.83 1.077 1.445.78zM12 6.75a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" /></svg>
          </div>
       </div>

       <div class="border rounded-lg p-4 shadow-sm relative hover:shadow-md transition bg-white">
          <div class="text-3xl font-bold text-gray-800 mb-1">{{ formatNumber(summary.wildlife_images) }}</div>
          <div class="text-gray-500 text-sm font-medium">Wildlife images</div>
          <div class="absolute bottom-4 right-4 text-green-600">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.024c.026-.015.053-.03.078-.047.26-.18.796-.646.796-1.201 0-.74-.83-1.077-1.445-.78-1.146.573-2.437-.463-2.126-1.706l.709-2.836-.042.024c-.026.015-.053.03-.078.047-.26.18-.796.646-.796 1.201 0 .74.83 1.077 1.445.78zM12 6.75a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" /></svg>
          </div>
       </div>
       
       <div class="border rounded-lg p-4 shadow-sm relative hover:shadow-md transition bg-white">
          <div class="text-3xl font-bold text-gray-800 mb-1">{{ formatNumber(summary.sequences) }}</div>
          <div class="text-gray-500 text-sm font-medium">Sequences</div>
          <div class="absolute bottom-4 right-4 text-green-600"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.024c.026-.015.053-.03.078-.047.26-.18.796-.646.796-1.201 0-.74-.83-1.077-1.445-.78-1.146.573-2.437-.463-2.126-1.706l.709-2.836-.042.024c-.026.015-.053.03-.078.047-.26.18-.796.646-.796 1.201 0 .74.83 1.077 1.445.78zM12 6.75a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" /></svg></div>
       </div>

       <div class="border rounded-lg p-4 shadow-sm relative hover:shadow-md transition bg-white">
          <div class="text-3xl font-bold text-gray-800 mb-1">{{ formatNumber(summary.wildlife_sequences) }}</div>
          <div class="text-gray-500 text-sm font-medium">Wildlife Sequences</div>
          <div class="absolute bottom-4 right-4 text-green-600"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.024c.026-.015.053-.03.078-.047.26-.18.796-.646.796-1.201 0-.74-.83-1.077-1.445-.78-1.146.573-2.437-.463-2.126-1.706l.709-2.836-.042.024c-.026.015-.053.03-.078.047-.26.18-.796.646-.796 1.201 0 .74.83 1.077 1.445.78zM12 6.75a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" /></svg></div>
       </div>

       <div class="border rounded-lg p-4 shadow-sm relative hover:shadow-md transition bg-white">
          <div class="text-3xl font-bold text-gray-800 mb-1">{{ formatNumber(summary.cameras) }}</div>
          <div class="text-gray-500 text-sm font-medium">Cameras</div>
          <div class="absolute bottom-4 right-4 text-green-600"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.024c.026-.015.053-.03.078-.047.26-.18.796-.646.796-1.201 0-.74-.83-1.077-1.445-.78-1.146.573-2.437-.463-2.126-1.706l.709-2.836-.042.024c-.026.015-.053.03-.078.047-.26.18-.796.646-.796 1.201 0 .74.83 1.077 1.445.78zM12 6.75a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" /></svg></div>
       </div>

       <div class="border rounded-lg p-4 shadow-sm relative hover:shadow-md transition bg-white">
          <div class="text-3xl font-bold text-gray-800 mb-1">{{ formatNumber(summary.deployments) }}</div>
          <div class="text-gray-500 text-sm font-medium">Camera deployments</div>
          <div class="absolute bottom-4 right-4 text-green-600"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.024c.026-.015.053-.03.078-.047.26-.18.796-.646.796-1.201 0-.74-.83-1.077-1.445-.78-1.146.573-2.437-.463-2.126-1.706l.709-2.836-.042.024c-.026.015-.053.03-.078.047-.26.18-.796.646-.796 1.201 0 .74.83 1.077 1.445.78zM12 6.75a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" /></svg></div>
       </div>

       <div class="border rounded-lg p-4 shadow-sm relative hover:shadow-md transition bg-white">
          <div class="text-3xl font-bold text-gray-800 mb-1">{{ formatNumber(summary.countries) }}</div>
          <div class="text-gray-500 text-sm font-medium">Countries</div>
          <div class="absolute bottom-4 right-4 text-green-600"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.024c.026-.015.053-.03.078-.047.26-.18.796-.646.796-1.201 0-.74-.83-1.077-1.445-.78-1.146.573-2.437-.463-2.126-1.706l.709-2.836-.042.024c-.026.015-.053.03-.078.047-.26.18-.796.646-.796 1.201 0 .74.83 1.077 1.445.78zM12 6.75a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" /></svg></div>
       </div>

       <div class="border rounded-lg p-4 shadow-sm relative hover:shadow-md transition bg-white">
          <div class="text-3xl font-bold text-gray-800 mb-1">{{ formatNumber(summary.organizations) }}</div>
          <div class="text-gray-500 text-sm font-medium">Organizations</div>
          <div class="absolute bottom-4 right-4 text-green-600"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.024c.026-.015.053-.03.078-.047.26-.18.796-.646.796-1.201 0-.74-.83-1.077-1.445-.78-1.146.573-2.437-.463-2.126-1.706l.709-2.836-.042.024c-.026.015-.053.03-.078.047-.26.18-.796.646-.796 1.201 0 .74.83 1.077 1.445.78zM12 6.75a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" /></svg></div>
       </div>

       <div class="border rounded-lg p-4 shadow-sm relative hover:shadow-md transition bg-white">
          <div class="text-3xl font-bold text-gray-800 mb-1">{{ formatNumber(summary.initiatives) }}</div>
          <div class="text-gray-500 text-sm font-medium">Initiatives</div>
          <div class="absolute bottom-4 right-4 text-green-600"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.024c.026-.015.053-.03.078-.047.26-.18.796-.646.796-1.201 0-.74-.83-1.077-1.445-.78-1.146.573-2.437-.463-2.126-1.706l.709-2.836-.042.024c-.026.015-.053.03-.078.047-.26.18-.796.646-.796 1.201 0 .74.83 1.077 1.445.78zM12 6.75a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" /></svg></div>
       </div>

    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  speciesList: Array,
  projectList: Array,
  countryList: Array, // รับรายชื่อประเทศมา
  summary: Object
})

const emit = defineEmits(['update-filters'])

const localFilters = ref({
  species: null, 
  country: null, // เพิ่มตัวแปรสำหรับประเทศ
  project: null,
  startDate: '1990-01-01',
  endDate: new Date().toISOString().slice(0, 10)
})

watch(localFilters, (newVal) => {
  emit('update-filters', { ...newVal })
}, { deep: true })

function formatNumber(num) {
  if (!num && num !== 0) return '0'
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
</script>