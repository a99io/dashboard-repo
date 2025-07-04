<template>
  <v-app>
    <v-main>
      <div class="text-center">
        <!-- الزر -->
        <v-card>
          <v-card-actions class="justify-end py-7">
            <v-btn
              class="text-white px-5 font-weight-bold ml-3"
              variant="elevated"
              color="#28C76F"
              @click="dialog = true"
            >
              تغيير الاحصائيات
            </v-btn>
          </v-card-actions>
        </v-card>

        <!-- المودال -->
        <v-dialog v-model="dialog" max-width="500">
          <v-card>
            <v-card-title class="font-weight-bold"> <h2>تغييرالإحصائيات</h2></v-card-title>
            <v-card-text>
              <v-text-field label="المشاريع المنتهية"  />
              <v-text-field class="mt-4 mb-4" label="المعدات المثبتة"  />
              <v-text-field label=" الاستثمارات"/>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn   variant="text"  color="#EA5455"  @click="dialog =false">إلغاء</v-btn>
              <v-btn variant="text" color="#28C76F" @click="dialog = false">حفظ</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- البطاقات -->
        <v-row justify="center" class="mt-3">
          <v-col cols="12" md="4">
            <v-card elevation="4" class="pa-6 rounded-lg" id="card">
              <div class="text-h1" style="color:#28C76F;">22</div>
              <div class="text-h5" style="color: #6A6E87;">الاستثمارات</div>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card elevation="4" class="pa-6 rounded-lg" id="card">
              <div class="text-h1" style="color:#28C76F;">22</div>
              <div class="text-h5" style="color: #6A6E87;">المعدات المثبتة</div>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card elevation="4" class="py-1 rounded-lg" id="card">
              <div class="text-h1" style="color:#28C76F;">22</div>
              <div class="text-h5" style="color: #6A6E87;">المشاريع المنتهية</div>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dialog = ref(false)
</script>

<style scoped>
.v-application {
  font-family: 'Tahoma', 'Arial', sans-serif;
  direction: rtl;
}

#card {
  transition: transform 0.3s;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#card:hover {
  transform: translateY(-5px);
}
</style>