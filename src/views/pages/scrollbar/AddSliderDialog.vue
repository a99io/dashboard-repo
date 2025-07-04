<template>
     <v-card>
            <v-card-actions class="justify-end py-7">
              <v-btn
                class="text-white px-5 font-weight-bold ml-3"
                variant="elevated"
                color="#28C76F"
                @click="dialog = true"
              >
                Add Partnership
              </v-btn>
            </v-card-actions>
          </v-card>

  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title>Add New Slider</v-card-title>
      <v-card-text>
        <v-file-input
          label="Choose Image"
          accept="image/*"
          prepend-icon="mdi-camera"
          @update:modelValue="onFileChange"
        />
        <v-img
          v-if="newPartnership.image"
          :src="newPartnership.image"
          height="200px"
          contain
          class="mt-4"
        />
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="text" color="error" @click="dialog = false">Cancel</v-btn>
        <v-btn variant="text" color="success" :disabled="!newPartnership.image" @click="$emit('add')">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  dialog: boolean,
  newPartnership: { image: string }
}>()

const emit = defineEmits(['update:dialog', 'update:newPartnership', 'add'])

const dialog = ref(props.dialog)
watch(() => props.dialog, val => dialog.value = val)
watch(dialog, val => emit('update:dialog', val))

const onFileChange = (file: File | File[] | null) => {
  const selectedFile = Array.isArray(file) ? file[0] : file
  if (selectedFile) {
    const reader = new FileReader()
    reader.onload = (e) => {
      emit('update:newPartnership', { image: e.target?.result as string })
    }
    reader.readAsDataURL(selectedFile)
  }
}
</script>
