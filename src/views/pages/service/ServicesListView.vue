<template>
  <v-container>
    <v-card class="pa-4" elevation="2">
      <v-table class="table-dark text-white" dense>
        <thead>
          <tr>
            <th class="text-center">TITLE</th>
            <th class="text-center">SUBTITLE</th>
            <th class="text-center" style="width: 150px;">IMAGE</th>
            <th class="text-center">PHONE NUMBER</th>
            <th class="text-center">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in services" :key="index">
            <td class="text-center">{{ item.title }}</td>
            <td class="text-center">{{ item.subtitle }}</td>
            <td class="text-center" style="height: 80px; width: 150px; padding: 8px;">
              <v-img 
                :src="item.image" 
                max-height="80" 
                max-width="150" 
                contain
                class="mx-auto"
              />
            </td>
            <td class="text-center">{{ item.phone }}</td>
            <td class="text-center">
              <v-icon 
                class="ml-4" 
                color="#FF0000" 
                style="cursor: pointer;"
                @click="$emit('delete', index)"
              >mdi-delete</v-icon>
              <v-icon 
                color="white" 
                class="mr-2" 
                style="cursor: pointer;"
                @click="$emit('edit', index)"
              >mdi-pencil</v-icon>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>
</template>

<script setup>
defineProps({
  services: Array
})

defineEmits(['edit', 'delete'])
</script>