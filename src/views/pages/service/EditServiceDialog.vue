<template>
    <v-dialog v-model="dialogModel" max-width="500" persistent>
      <v-card>
        <v-card-title class="font-weight-bold d-flex justify-space-between">
          <h2 class="mt-2">Edit Service</h2>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        
        <v-card-text>
          <v-form ref="form" @submit.prevent="saveChanges">
            <v-text-field 
              v-model="localServiceData.title" 
              label="Title"
              :rules="[requiredRule]"
              outlined
              class="mb-4"
            />
            
            <v-text-field 
              v-model="localServiceData.subtitle" 
              label="Subtitle"
              outlined
              class="mb-4"
            />
            
            <v-text-field 
              v-model="localServiceData.phone" 
              label="Phone Number"
              :rules="[phoneRule]"
              outlined
              class="mb-4"
            />
  
            <div v-if="localServiceData.image" class="mb-4">
              <p class="font-weight-medium">Current Image:</p>
              <v-img 
                :src="localServiceData.image" 
                max-height="150" 
                contain
                class="rounded"
              />
            </div>
            
            <input
              type="file"
              ref="fileInput"
              accept="image/*"
              style="display: none"
              @change="handleImageUpload"
            />
            
            <v-btn 
              color="primary" 
              class="mt-2"
              @click="$refs.fileInput.click()"
              block
            >
              <v-icon left>mdi-image-edit</v-icon>
              Change Image
            </v-btn>
          </v-form>
        </v-card-text>
        
        <v-card-actions class="justify-end pa-4">
          <v-btn 
            color="#EA5455" 
            text 
            @click="closeDialog"
            class="mr-2"
          >
            إلغاء
          </v-btn>
          <v-btn 
            color="#28C76F" 
            depressed
            @click="saveChanges"
            :loading="isSaving"
          >
            حفظ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  
  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true
    },
    serviceData: {
      type: Object,
      required: true,
      default: () => ({
        title: '',
        subtitle: '',
        phone: '',
        image: ''
      })
    }
  })
  
  const emit = defineEmits(['update:modelValue', 'save', 'image-upload'])
  
  // Local state
  const dialogModel = ref(props.modelValue)
  const localServiceData = ref({...props.serviceData})
  const isSaving = ref(false)
  const form = ref(null)
  
  // Validation rules
  const requiredRule = value => !!value || 'This field is required'
  const phoneRule = value => {
    const pattern = /^[0-9]{10,15}$/
    return pattern.test(value) || 'Invalid phone number'
  }
  
  // Watchers
  watch(() => props.modelValue, (newVal) => {
    dialogModel.value = newVal
  })
  
  watch(() => props.serviceData, (newVal) => {
    localServiceData.value = {...newVal}
  }, { deep: true })
  
  watch(dialogModel, (newVal) => {
    emit('update:modelValue', newVal)
  })
  
  // Methods
  const closeDialog = () => {
    dialogModel.value = false
  }
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        localServiceData.value.image = e.target.result
      }
      reader.readAsDataURL(file)
      emit('image-upload', event)
    }
  }
  
  const saveChanges = async () => {
    const { valid } = await form.value.validate()
    
    if (valid) {
      isSaving.value = true
      try {
        emit('save', localServiceData.value)
        closeDialog()
      } finally {
        isSaving.value = false
      }
    }
  }
  </script>
  
  <style scoped>
  .rounded {
    border-radius: 8px;
  }
  </style>