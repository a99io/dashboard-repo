<template>
  <v-dialog v-model="model" max-width="600">
    <v-card>
      <v-card-title>إضافة مقالة جديدة</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            label="العنوان"
            v-model="article.title"
            required
          />
          <v-file-input
            label="الصورة"
            v-model="article.image"
            accept="image/*"
            prepend-icon="mdi-camera"
            show-size
          />
          <v-text-field
            label="التاريخ"
            v-model="article.createdAt"
            type="date"
          />
          <v-text-field
            label="الوصف"
            v-model="article.description"
          />
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn text @click="model = false">إلغاء</v-btn>
        <v-btn color="primary" @click="save">حفظ</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'


const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})


const emit = defineEmits(['update:modelValue', 'save-article'])


const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const article = ref({
  title: '',
  description: '',
  image: '',
  createdAt: ''
})

// emit the article data to parent on save
function save() {
  emit('save-article', article.value)
  model.value = false // close dialog
}
</script>
