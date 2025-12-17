<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <Header />
    
    <div class="flex flex-1 overflow-hidden relative">
      <div 
        class="flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden bg-white shadow-xl z-20"
        :class="isSidebarOpen ? 'w-[500px]' : 'w-0'"
      >
        <Sidebar
          :species-list="speciesList"
          :project-list="projectList"
          :country-list="countryList"
          :summary="computedSummary" 
          @update-filters="updateFilters"
        />
      </div>

      <MapView 
        :deployments="filteredDeployments" 
        :is-sidebar-open="isSidebarOpen"
        @toggle-sidebar="handleToggle"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import Papa from 'papaparse'
import Header from '~/components/Header.vue'
import Sidebar from '~/components/Sidebar.vue'
import MapView from '~/components/MapView.vue'

// --- 1. State ---
const isSidebarOpen = ref(true)

function handleToggle() {
  isSidebarOpen.value = !isSidebarOpen.value
}

const rawData = ref({
  images: [],
  deployments: [],
  cameras: [],
  projects: []
})

// เก็บค่า Filter ที่ส่งมาจาก Sidebar
const filters = ref({
  species: null,
  country: null, 
  project: null,
  startDate: '1990-01-01',
  endDate: '2025-12-31'
})

// --- 2. Prepared Lists (สำหรับ Dropdown) ---

// รายชื่อ Species (ดึงจาก Images)
const speciesList = computed(() => {
  const set = new Set(rawData.value.images.map(r => r.species_common_name || `${r.genus} ${r.species}`).filter(Boolean))
  return Array.from(set).sort()
})

// รายชื่อ Projects (ดึงจาก Projects CSV)
const projectList = computed(() => {
  return rawData.value.projects.map(r => ({ 
    id: r.project_id, 
    name: r.project_name
  }))
})

// รายชื่อ Countries (ดึงจาก Projects CSV)
const countryList = computed(() => {
  // สมมติใน csv มีคอลัมน์ชื่อ 'country' หรือ 'country_code'
  const set = new Set(rawData.value.projects.map(r => r.country || r.country_code).filter(Boolean))
  return Array.from(set).sort()
})

// --- 3. Filtering Logic (สำคัญ) ---

// หาว่า Project ID ไหนบ้าง ที่ผ่านเงื่อนไข "ประเทศ" และ "ชื่อโปรเจกต์"
const allowedProjectIds = computed(() => {
  return rawData.value.projects.filter(p => {
    // 1. กรองตามประเทศ
    if (filters.value.country) {
      const pCountry = p.country || p.country_code
      if (pCountry !== filters.value.country) return false
    }
    // 2. กรองตามโปรเจกต์ (ถ้ามีการเลือกเจาะจง)
    if (filters.value.project) {
      if (p.project_id !== filters.value.project) return false
    }
    return true
  }).map(p => p.project_id) // คืนค่าออกมาเป็น Array ของ Project ID
})

// กรอง Images (ใช้แสดงตัวเลขสถิติ)
const filteredImages = computed(() => {
  const allowedIDs = allowedProjectIds.value // ดึง ID ที่ผ่านเงื่อนไขมาใช้

  return rawData.value.images.filter(img => {
    // 1. เช็คว่า Image นี้อยู่ใน Project ที่เราอนุญาตไหม (Country/Project Filter)
    if (!allowedIDs.includes(img.project_id)) return false

    // 2. Filter Species
    if (filters.value.species) {
      const imgName = img.species_common_name || `${img.genus} ${img.species}`
      if (imgName !== filters.value.species) return false
    }

    // 3. Filter Date
    const imgDate = img.timestamp || img.date_taken
    if (imgDate) {
      if (filters.value.startDate && imgDate < filters.value.startDate) return false
      if (filters.value.endDate && imgDate > filters.value.endDate) return false
    }
    return true
  })
})

// กรอง Deployments (ใช้แสดงจุดบนแผนที่)
const filteredDeployments = computed(() => {
  const allowedIDs = allowedProjectIds.value

  return rawData.value.deployments.filter(d => {
    // 1. เช็คว่า Deployment นี้อยู่ใน Project ที่เราอนุญาตไหม
    if (!allowedIDs.includes(d.project_id)) return false
    
    // 2. (Optional) กรองตามวันที่ของ Deployment ด้วยก็ได้
    // ... logic วันที่ ...

    return true
  }).map(d => ({ 
    lat: parseFloat(d.latitude), 
    lng: parseFloat(d.longitude), 
    deployment_id: d.deployment_id 
  }))
})

// --- 4. Summary Statistics (คำนวณตัวเลข) ---
const computedSummary = computed(() => {
  const images = filteredImages.value
  
  // คำนวณค่าจริงจากข้อมูลที่กรองแล้ว
  const totalImgs = images.length
  const wildlifeImgs = images.filter(r => r.is_blank === '0' || r.is_blank === 'false').length
  const uniqueSpecies = new Set(images.map(r => r.species_common_name).filter(Boolean)).size
  
  // นับจำนวน Project ที่เกี่ยวข้อง (จาก allowed IDs ที่มีภาพ)
  const activeProjectIds = new Set(images.map(r => r.project_id))
  const uniqueProjects = activeProjectIds.size || (filters.value.project ? 1 : (filters.value.country ? 0 : rawData.value.projects.length))
  
  const uniqueCameras = new Set(images.map(r => r.camera_id)).size
  const deploymentsCount = filteredDeployments.value.length

  // Mockup Data (สำหรับค่าที่ไม่มีใน CSV เพื่อให้ UI สวยงาม)
  const estimatedSequences = Math.floor(totalImgs / 3) 
  const estimatedWildlifeSequences = Math.floor(wildlifeImgs / 3)

  return {
    species: uniqueSpecies,
    projects: uniqueProjects,
    images: totalImgs,
    wildlife_images: wildlifeImgs,
    sequences: estimatedSequences,           
    wildlife_sequences: estimatedWildlifeSequences, 
    cameras: uniqueCameras,
    deployments: deploymentsCount,
    countries: filters.value.country ? 1 : countryList.value.length, // ถ้าเลือกประเทศแล้วจะเหลือ 1
    organizations: 0, // Mockup
    initiatives: 0     // Mockup
  }
})

// ฟังก์ชันรับค่าจาก Sidebar มาอัปเดตตัวแปร filters
function updateFilters(newFilters) { 
  filters.value = { ...filters.value, ...newFilters } 
}

// --- 5. Data Loading ---
onMounted(() => {
  const loadCSV = (file) => new Promise(resolve => Papa.parse(file, { header: true, download: true, skipEmptyLines: true, complete: res => resolve(res.data) }))
  
  Promise.all([
    loadCSV('/data/images.csv'), 
    loadCSV('/data/deployments.csv'), 
    loadCSV('/data/cameras.csv'), 
    loadCSV('/data/projects.csv'),
    loadCSV('/data/sequences.csv')
  ]).then(([img, dep, cam, proj, seq]) => {
      rawData.value.images = img; 
      rawData.value.deployments = dep; 
      rawData.value.cameras = cam; 
      rawData.value.projects = proj
      rawData.value.sequences = seq;
  })
})
</script>