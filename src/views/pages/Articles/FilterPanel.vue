<template>
    <transition name="expand">
      <v-card class="mt-2 filter-content">
        <v-card-text>
          <v-text-field
            label="Title"
            variant="outlined"
            class="mb-4"
          ></v-text-field>
          
          <v-text-field
            label="Subtitle"
            variant="outlined"
            class="mb-4"
          ></v-text-field>
          
          <v-text-field
            label="Phone Number"
            variant="outlined"
            type="tel"
          ></v-text-field>
        </v-card-text>
      </v-card>
    </transition>
  </template>
  
  <script setup>
  // No script needed for this simple component
  </script>
  
  <style scoped>
  .filter-content {
    border-radius: 6px;
    padding: 16px;
    margin: 0 4px;
  }
  
  .expand-enter-active,
  .expand-leave-active {
    transition: all 0.4s ease;
    overflow: hidden;
  }
  
  .expand-enter-from,
  .expand-leave-to {
    max-height: 0;
    opacity: 0;
    transform: translateY(-10px);
  }
  
  .expand-enter-to,
  .expand-leave-from {
    max-height: 300px;
    opacity: 1;
    transform: translateY(0);
  }
  </style>