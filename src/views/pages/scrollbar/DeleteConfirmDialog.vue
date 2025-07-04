<template>
  <v-dialog v-model="deleteDialog" max-width="400">
    <v-card>
      <v-card-title class="text-h5">Confirm Deletion</v-card-title>
      <v-card-text>
        Are you sure you want to delete this Slider?
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" text @click="$emit('confirm')">Delete</v-btn>
        <v-btn color="#28C76F" text @click="deleteDialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  deleteDialog: boolean
}>()

const emit = defineEmits(['update:deleteDialog', 'confirm'])

const deleteDialog = ref(props.deleteDialog)
watch(() => props.deleteDialog, val => deleteDialog.value = val)
watch(deleteDialog, val => emit('update:deleteDialog', val))
</script>
