<template>
    <v-container fluid>
      <v-row>
        <v-col
          v-for="(service, index) in services"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card>
            <v-img
              :src="service.image"
              height="200px"
              cover
            ></v-img>
  
            <v-card-title class="text-h6">{{ service.title }}</v-card-title>
            <v-card-subtitle>{{ service.subtitle }}</v-card-subtitle>
  
            <v-card-text>
              <div> {{ service.phone }}</div>
            </v-card-text>
  
            <v-card-actions>
              <v-btn color="primary" @click="$emit('edit', index)">
                <v-icon left>mdi-pencil</v-icon> 
              </v-btn>
              <v-btn color="error" @click="$emit('delete', index)">
                <v-icon left>mdi-delete</v-icon> 
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  
  defineProps({
    services: Array
  })
  
  defineEmits(['edit', 'delete'])
  </script>
  
  <style scoped>
  .v-card {
    transition: 0.3s ease;
  }
  
  .v-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
  }
  </style>
  
