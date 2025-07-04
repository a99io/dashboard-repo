<template>
    <v-dialog v-model="dialogModel" max-width="500" persistent>
      <v-card>
        <v-card-title class="d-flex justify-space-between">
          <h2>Edit Service</h2>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
  
        <v-card-text>
          <!-- Title -->
          <v-text-field 
            v-model="localServiceData.title" 
            label="Title"
            outlined
            class="mb-4"
          />
  
          <!-- Date -->
          <v-text-field 
            v-model="localServiceData.date" 
            label="Select Date"
            type="date"
            outlined
            class="mb-4"
          />
  
          <!-- Image Preview -->
          <div v-if="localServiceData.image" class="mb-4">
            <p>Current Image:</p>
            <v-img 
              :src="localServiceData.image" 
              max-height="150" 
              contain
              class="rounded"
            />
          </div>
  
          <!-- Image Upload -->
          <input
            type="file"
            ref="fileInput"
            accept="image/*"
            style="display: none"
            @change="handleImageUpload"
          />
  
          <v-btn 
            color="primary" 
            @click="triggerFileInput"
            block
          >
            <v-icon left>mdi-image-edit</v-icon>
            Change Image
          </v-btn>
        </v-card-text>
  
        <v-card-actions class="justify-end pa-4">
          <v-btn color="#EA5455" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="#28C76F" @click="saveChanges">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  
  const props = defineProps({
    modelValue: Boolean,
    serviceData: {
      type: Object,
      required: true,
      default: () => ({
        title: '',
        date: '',
        image: ''
      })
    }
  })
  
  const emit = defineEmits(['update:modelValue', 'save'])
  
  const dialogModel = ref(props.modelValue)
  const localServiceData = ref({ ...props.serviceData })
  
  // Watch for dialog open/close
  watch(() => props.modelValue, (val) => {
    dialogModel.value = val
  })
  
  // Watch when serviceData changes (on edit)
  watch(() => props.serviceData, (val) => {
    localServiceData.value = { ...val }
  }, { deep: true })
  
  // Sync dialogModel with v-model
  watch(dialogModel, (val) => {
    emit('update:modelValue', val)
  })
  
  const closeDialog = () => {
    dialogModel.value = false
  }
  
  const triggerFileInput = () => {
    fileInput.value?.click()
  }
  
  const fileInput = ref(null)
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        localServiceData.value.image = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
  
  const saveChanges = () => {
    emit('save', localServiceData.value)
    closeDialog()
  }
  </script>
  
  <style scoped>
  .rounded {
    border-radius: 8px;
  }
  </style>
  