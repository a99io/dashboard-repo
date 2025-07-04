<template>
    <v-dialog v-model="dialogModel" max-width="500">
      <v-card>
        <v-card-title class="font-weight-bold">
          <h2 class="mt-2">
           Add New Articles
          </h2>
        </v-card-title>
        <v-card-text>
          <v-text-field 
            v-model="props.serviceData.title" 
            label="Title" 
            outlined
          />
          <v-text-field
          v-model="props.serviceData"
          label="Select Date"
          type="date"
          outlined
        ></v-text-field>
      
  
          <!-- ✅ هذا هو input الصورة -->
          <input
            type="file"
            ref="fileInputRef"
            accept="image/*"
            style="display: none"
            @change="handleImageUpload"
          />
          <!-- ✅ الزر الصحيح -->
          <v-btn 
            color="primary" 
            class="mt-4"
            @click="triggerFileInput"
          >
            Upload Image
          </v-btn>
          
          <div v-if="props.serviceData.image" class="mt-4">
            <p>Preview:</p>
            <img :src="props.serviceData.image" style="max-height: 150px; max-width: 100%;" />
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" color="#EA5455" @click="closeDialog">إلغاء</v-btn>
          <v-btn variant="text" color="#28C76F" @click="saveService">حفظ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, defineProps, defineEmits } from 'vue'
  
  interface ServiceData {
    title: string
    subtitle: string
    phone: string
    image: string | null
  }
  
  const props = defineProps<{
    modelValue: boolean
    serviceData: ServiceData
   
   
  }>()
  
  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'add-service'): void
  }>()
  
  const dialogModel = ref(props.modelValue)
  
  // ✅ هذا هو الريف الصحيح للفايل إنبوت
  const fileInputRef = ref<HTMLInputElement | null>(null)
  
  // ✅ عند الضغط على الزر، شغل كليك للفايل إنبوت
  const triggerFileInput = () => {
    fileInputRef.value?.click()
  }
  
  // ✅ رفع الصورة وتحويلها Base64
  const handleImageUpload = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        props.serviceData.image = reader.result as string
      }
      reader.readAsDataURL(file)
    }
  }
  
  watch(() => props.modelValue, (newVal) => {
    dialogModel.value = newVal
  })
  
  watch(dialogModel, (newVal) => {
    emit('update:modelValue', newVal)
  })
  
  const closeDialog = () => {
    dialogModel.value = false
  }
  
  const saveService = () => {
    if (props.serviceData.title && props.serviceData.image) {
      emit('add-service')
      closeDialog()
    }
  }
  
  </script>
  