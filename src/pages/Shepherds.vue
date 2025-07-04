<template>
  <v-app>
    <v-main>
      <v-container>
        <add-slider-dialog
          v-model:dialog="dialog"
          v-model:newPartnership="newPartnership"
          @add="addPartnership"
        />

        <slider-list
          :partnerships="partnerships"
          @edit="editImage"
          @delete="confirmDelete"
        />

        <edit-slider-dialog
          v-model:editDialog="editDialog"
          v-model:editingPartnership="editingPartnership"
          @save="saveImage"
        />

        <delete-confirm-dialog
          v-model:deleteDialog="deleteDialog"
          @confirm="deletePartnership"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AddSliderDialog from '@/views/pages/scrollbar/AddSliderDialog.vue'
import EditSliderDialog from '@/views/pages/scrollbar/EditSliderDialog.vue'
import DeleteConfirmDialog from '@/views/pages/scrollbar/DeleteConfirmDialog.vue'
import SliderList from '@/views/pages/scrollbar/SliderList.vue'

type Partnership = { image: string }

const dialog = ref(false)
const editDialog = ref(false)
const deleteDialog = ref(false)

const partnerships = ref<Partnership[]>([
  { image: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg' },
  { image: 'https://cdn.vuetifyjs.com/images/cards/house.jpg' },
  { image: 'https://cdn.vuetifyjs.com/images/cards/road.jpg' }
])

const newPartnership = ref<Partnership>({ image: '' })
const editingPartnership = ref<Partnership>({ image: '' })

const currentItemId = ref<number | null>(null)
const deleteIndex = ref<number | null>(null)

const addPartnership = () => {
  if (newPartnership.value.image) {
    partnerships.value.push({ ...newPartnership.value })
    newPartnership.value.image = ''
    dialog.value = false
  }
}

const editImage = (index: number) => {
  currentItemId.value = index
  editingPartnership.value = { ...partnerships.value[index] }
  editDialog.value = true
}

const saveImage = () => {
  if (currentItemId.value !== null) {
    partnerships.value[currentItemId.value] = { ...editingPartnership.value }
    editDialog.value = false
  }
}

const confirmDelete = (index: number) => {
  deleteIndex.value = index
  deleteDialog.value = true
}

const deletePartnership = () => {
  if (deleteIndex.value !== null) {
    partnerships.value.splice(deleteIndex.value, 1)
    deleteDialog.value = false
  }
}
</script>
