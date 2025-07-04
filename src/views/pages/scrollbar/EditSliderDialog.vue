<template>
  <v-dialog v-model="editDialog" max-width="500">
    <v-card>
      <v-card-title>Edit Slider</v-card-title>
      <v-card-text>
        <v-img
          :src="editingPartnership.image"
          height="200px"
          contain
          class="mb-4"
        />
        <v-file-input
          label="Change Image"
          accept="image/*"
          prepend-icon="mdi-image"
          @update:modelValue="onFileChange"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#28C76F" text @click="editDialog = false">Cancel</v-btn>
        <v-btn color="#FF0000" text @click="$emit('save')">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  editDialog: boolean,
  editingPartnership: { image: string }
}>()

const emit = defineEmits(['update:editDialog', 'update:editingPartnership', 'save'])

const editDialog = ref(props.editDialog)
watch(() => props.editDialog, val => editDialog.value = val)
watch(editDialog, val => emit('update:editDialog', val))

const onFileChange = (file: File | File[] | null) => {
  const selectedFile = Array.isArray(file) ? file[0] : file
  if (selectedFile) {
    const reader = new FileReader()
    reader.onload = (e) => {
      emit('update:editingPartnership', { image: e.target?.result as string })
    }
    reader.readAsDataURL(selectedFile)
  }
}
</script>
