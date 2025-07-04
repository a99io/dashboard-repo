<template>
  <div class="p-4">
    <h2>Select your drinks:</h2>

    <div v-for="item in items" :key="item" class="mb-2">
      <label>
        <input type="checkbox" :value="item" v-model="selectedItems" />
        {{ item }}
      </label>
    </div>

    <button @click="showSelected = !showSelected" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
      {{ showSelected ? 'Hide' : 'Show' }} My Selection
    </button>

    <transition name="slide">
      <myselected v-if="showSelected" :items="selectedItems" />
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import myselected from './myselected.vue'

const items = ['Milk', 'Coffee', 'Orange Juice', 'Banana Juice', 'Tea']
const selectedItems = ref([])
const showSelected = ref(false)
</script>
