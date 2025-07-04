<template>
  <v-form ref="formRef" @submit.prevent="submitForm">
    <v-text-field
      v-model="emailValue"
      label="البريد الإلكتروني"
      :rules="[required('البريد الإلكتروني'), emailRule]"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      label="كلمة المرور"
      :rules="[required('كلمة المرور'), minLength('كلمة المرور', 6)]"
      type="password"
      required
    ></v-text-field>

    <v-btn type="submit" color="primary">تسجيل الدخول</v-btn>
  </v-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { required, minLength, emailRule } from '@/components/validationRules';

const emailValue = ref('');
const password = ref('');
const formRef = ref();

const submitForm = async () => {
  if (formRef.value) {
    const { valid } = await formRef.value.validate();
    if (valid) {
      alert('تم الإرسال بنجاح!');
    } else {
      alert('يرجى تصحيح الأخطاء في النموذج.');
    }
  }
};
</script>
