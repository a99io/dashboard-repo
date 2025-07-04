
<template>
  <div class="p-4 border rounded bg-gray-100">
    <h3>You selected:</h3>
    <ul>
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
    <div v-if="items.length === 0" class="text-gray-500">No items selected.</div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>
