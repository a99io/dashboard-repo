<template>
  <v-card class="py-4">
    <v-card-actions>
      <v-row align="center">
        <v-col cols="4">
          <v-text-field
            variant="outlined"
            label="Search"
            hide-details
            single-line
            full-width
          />
        </v-col>

        <v-col cols="1">
          <v-btn
            class="filter-button"
            @click="$emit('toggle-filter')"
            :color="showFilter ? '#28C76F' : ''"
            variant="elevated"
          >
            <v-icon left>mdi-filter</v-icon>
          </v-btn>
        </v-col>

        <v-spacer></v-spacer>

        <v-tabs
          :model-value="viewMode"
          @update:modelValue="updateViewMode"
        >
          <v-tab value="list" color="#28C76F">
            <v-icon style="font-size: 30px;">mdi-menu</v-icon>
          </v-tab>
          <v-tab value="grid" color="#28C76F">
            <v-icon style="font-size: 30px;">mdi-view-grid</v-icon>
          </v-tab>
        </v-tabs>

        <v-btn
          color="#28C76F"
          class="text-white mr-3"
          variant="elevated"
          @click="$emit('add-service')"
        >
          {{ props.abo  || props.newname }}
        
        </v-btn>
        <v-col cols="2"></v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script setup>
// import { type } from 'os'
// import { type } from 'os'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  showFilter: Boolean,
  viewMode: {
    type: String,
    default: 'list'
  },
  abo: {
    type:String,
   
  },
  newname: {
    type:String,
   
  }
})

const emit = defineEmits(['toggle-filter', 'add-service','view', 'update:viewMode'])

const updateViewMode = (val) => {
  emit('update:viewMode', val)
}
</script>
