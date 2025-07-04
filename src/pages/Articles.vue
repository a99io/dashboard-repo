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
          <v-btn class="filter-button" variant="elevated">
            <v-icon left>mdi-filter</v-icon>
          </v-btn>
        </v-col>

        <v-spacer />

        <v-tabs>
          <v-tab value="list">
            <v-icon style="font-size: 30px;">mdi-menu</v-icon>
          </v-tab>
          <v-tab value="grid">
            <v-icon style="font-size: 30px;">mdi-view-grid</v-icon>
          </v-tab>
        </v-tabs>

 
        <DialogForm v-model="dialog" />

        <v-btn
          color="#28C76F"
          class="text-white mr-3"
          variant="elevated"
          @click="dialog = true"
        >
          Add New Article
        </v-btn>

        <v-col cols="2" />
      </v-row>
    </v-card-actions>
  </v-card>

  <v-container>
    <v-card class="pa-4" elevation="2">
      <v-table class="table-dark text-white" dense>
        <thead>
          <tr>
            <th class="text-center">TITLE</th>
            <th class="text-center">DATE</th>
            <th class="text-center" style="width: 150px;">IMAGE</th>
            <th class="text-center">DESCRIPTION</th>
            <th class="text-center">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in services" :key="index">
            <td class="text-center">{{ item.title }}</td>
            <td class="text-center">{{ item.createdAt }}</td>
            <td class="text-center" style="height: 80px; width: 150px; padding: 8px;">
              <v-img
                :src="item.image"
                max-height="80"
                max-width="150"
                contain
                class="mx-auto"
              />
            </td>
            <td class="text-center">{{ item.description }}</td>
            <td class="text-center">
              <v-icon class="ml-4" color="#FF0000" style="cursor: pointer;">mdi-delete</v-icon>
              <v-icon color="white" class="mr-2" style="cursor: pointer;">mdi-pencil</v-icon>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import DialogForm from '@/views/pages/Articles/Artcils2/DialogForm.vue'

const dialog = ref(false)

const services = ref([])

async function fetchArticles() {
  try {
    const res = await axios.get('http://ao8kgskw4wcs0ck48sgwg440.194.163.168.91.sslip.io/api/Artical?pageNumber=1&pageSize=10')
    services.value = res.data.data
  } catch (err) {
    console.error('Failed to fetch articles:', err)
  }
}

onMounted(fetchArticles)
</script>
