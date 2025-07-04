<template>
  <div>
    <ServicesToolbar 
      :show-filter="showFilter"
      @toggle-filter="toggleFilter"
      @add-service="openAddDialog"
      v-model:view-mode="viewMode"
      abo="Add New Service"
      @view="vieww"
    />
    
    <AddServiceDialog 
      v-model="dialog"
      :service-data="newService"
      @add-service="addService"
      @image-upload="handleNewImageUpload"
       nameofservice="Add New Service"
    />
    
    <FilterPanel v-show="showFilter" />
    
    <ServicesListView 
      v-if="viewMode === 'list'"
      :services="paginatedServices"
      @edit="editService"
      @delete="confirmDelete"
    />
    
    <aboHusedn
  v-else-if="viewMode === 'grid'"
  :services="paginatedServices"
  @edit="editService"
  @delete="confirmDelete"
/>
    
    <v-pagination
      v-model="currentPage"
      :length="totalPages"
      :total-visible="7"
      class="mt-4"
    />
    
    <DeleteConfirmationDialog 
      v-model="deleteDialog"
      :service="serviceToDelete"
      @confirm="deleteService"
    />
    
    <EditServiceDialog 
      v-model="editDialog"
      :service-data="editingService"
      @save="saveEdit"
      @image-upload="handleEditImageUpload"
    />
  </div>
</template>

<script setup>
import { ref, computed,onMounted  } from 'vue'
import ServicesToolbar from '@/views/pages/service/ServicesToolbar.vue'
import AddServiceDialog from '@/views/pages/service/AddServiceDialog.vue'
import FilterPanel from '@/views/pages/service/FilterPanel.vue'
import ServicesListView from '@/views/pages/service/ServicesListView.vue'
import DeleteConfirmationDialog from '@/views/pages/service/DeleteConfirmationDialog.vue'
import EditServiceDialog from '@/views/pages/service/EditServiceDialog.vue'
import aboHusedn from '@/views/pages/service/aboHusedn.vue'
import { watch } from 'vue'

// Pagination
const itemsPerPage = 5
const currentPage = ref(1)

// UI State
const dialog = ref(false)
const showFilter = ref(false)
const deleteDialog = ref(false)
const editDialog = ref(false)
const viewMode = ref('list')

// Data
const serviceToDelete = ref(null)
const deleteIndex = ref(null)
const editingService = ref({})
const editingIndex = ref(null)

const newService = ref({
  title: '',
  subtitle: '',
  phone: '',
  image: ''
})

const services = ref([
    {
      title: 'Service 1',
      subtitle: 'Subtitle 1',
      phone: '07721573742',
      image: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'
    },
    {
      title: 'Service 2',
      subtitle: 'Subtitle 2',
      phone: '07721573742',
      image: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
    },
    {
      title: 'Service 3',
      subtitle: 'Subtitle 3',
      phone: '07721573742',
      image: 'https://cdn.vuetifyjs.com/images/cards/road.jpg'
    },
    {
      title: 'Service 4',
      subtitle: 'Subtitle 4',
      phone: '07721573742',
      image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
    },
    {
      title: 'Service 5',
      subtitle: 'Subtitle 5',
      phone: '07721573742',
      image: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'
    },
    {
      title: 'Service 6',
      subtitle: 'Subtitle 6',
      phone: '07721573742' ,
      image: 'https://cdn.vuetifyjs.com/images/cards/road.jpg'
    },
    {
      title: 'Service 7',
      subtitle: 'Subtitle 7',
      phone: '07721573742',
      image: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'
    }
])

// Computed Properties
const totalPages = computed(() => {
  return Math.ceil(services.value.length / itemsPerPage)
})

const paginatedServices = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return services.value.slice(start, end)
})

// Methods
const toggleFilter = () => {
  showFilter.value = !showFilter.value
}

const openAddDialog = () => {
  dialog.value = true
}

const confirmDelete = (index) => {
  serviceToDelete.value = services.value[index]
  deleteIndex.value = index
  deleteDialog.value = true
}

const deleteService = () => {
  services.value.splice(deleteIndex.value, 1)
  if (paginatedServices.value.length === 0 && currentPage.value > 1) {
    currentPage.value -= 1
  }
  deleteDialog.value = false
}

const editService = (index) => {
  editingIndex.value = index
  editingService.value = JSON.parse(JSON.stringify(services.value[index]))
  editDialog.value = true
}

const handleEditImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      editingService.value.image = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleNewImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      newService.value.image = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const saveEdit = (updatedService) => {
  if (editingIndex.value !== null) {
    services.value[editingIndex.value] = {...updatedService}
  }
  editDialog.value = false
}


const addService = () => {
  if (newService.value.title && newService.value.image) {
    services.value.push({...newService.value})
    newService.value = { title: '', subtitle: '', phone: '', image: '' }
    if (services.value.length > currentPage.value * itemsPerPage) {
      currentPage.value = totalPages.value
    }
    dialog.value = false
  }
}

watch(viewMode, (newValue) => {
  console.log('View mode changed to:', newValue)
})

onMounted(() => {
  console.log('Initial view mode:', viewMode.value)
})
defineProps({
  title: String,
  count: Number
})
</script>

<style scoped>
/* يمكنك نقل الأنماط العامة إلى ملف styles.css */
.filter-button {
  color: white !important;
  border-radius: 6px;
  height: 40px;
  min-width: 40px !important;
  padding: 0 16px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.v-pagination {
  justify-content: center;
  margin-top: 20px;
}
</style>