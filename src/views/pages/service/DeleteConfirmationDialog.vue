<template>
  <v-dialog v-model="dialogModel" max-width="400">
    <v-card>
      <v-card-title class="text-h5 text-right">تأكيد الحذف</v-card-title>
      <v-card-text class="text-right">
        هل أنت متأكد من أنك تريد حذف "{{ service?.title }}"؟
      </v-card-text>
      <v-card-actions>
        <v-btn color="#EA5455" text @click="confirmDelete">
          <span style="color: #EA5455;">حذف</span>
        </v-btn>
        <v-btn color="grey" text @click="closeDialog">إلغاء</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  service: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['update:modelValue', 'confirm']);

const dialogModel = ref(props.modelValue);

// Sync prop changes to local ref
watch(() => props.modelValue, (newVal) => {
  dialogModel.value = newVal;
});

// Emit when local ref changes
watch(dialogModel, (newVal) => {
  emit('update:modelValue', newVal);
});

const closeDialog = () => {
  dialogModel.value = false;
};

const confirmDelete = () => {
  emit('confirm');
  closeDialog();
};
</script>