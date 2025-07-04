<template>
  <div class="mt-4">
  <v-row>
    <v-col
      v-for="(partnership, index) in partnerships"
      :key="index"
      cols="12" sm="6" md="4"
    >
      <v-card>
        <v-img :src="partnership.image" height="200px" cover />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click="$emit('edit', index)">
            <v-icon color="#28C76F">mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="$emit('delete', index)">
            <v-icon color="#FF0000">mdi-delete</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  partnerships: { image: string }[]
}>()

const emit = defineEmits(['edit', 'delete'])
</script>
