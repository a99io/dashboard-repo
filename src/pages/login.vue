<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { VForm } from 'vuetify/components/VForm'

import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png'
import authV2MaskDark from '@images/pages/misc-mask-dark.png'
import authV2MaskLight from '@images/pages/misc-mask-light.png'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { required, emailRule } from '@/components/validationRules'
import axios from 'axios'
import router from '@/router'

const authThemeImg = useGenerateImageVariant(authV2LoginIllustrationLight, authV2LoginIllustrationDark, authV2LoginIllustrationBorderedLight, authV2LoginIllustrationBorderedDark, true)
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)

const isPasswordVisible = ref(false)

const refVForm = ref<VForm>()
const email = ref('') // نبدأه فاضي
const password = ref('')
const rememberMe = ref(false)

// ✅ عند تحميل الصفحة: نقرأ من localStorage
onMounted(() => {
  const isTokenExsist = localStorage.getItem("authToken")
  if (isTokenExsist) {
    router.push('/')
  }
})

const submitForm = async () => {
  if (refVForm.value) {
    try {
      const res = await axios.post('http://ao8kgskw4wcs0ck48sgwg440.194.163.168.91.sslip.io/api/Autors/login', {
        email: email.value,
        password: password.value
      })

      console.log('تم تسجيل الدخول، التوكن:', res.data.token)

      // ✅ نحفظ التوكن في localStorage
      localStorage.setItem('authToken', res.data.token)

      router.push('/')

    } catch (error) {
      console.error('خطأ في تسجيل الدخول', error)
      alert('فشل تسجيل الدخول، تحقق من البيانات')
    }
  }
}

</script>


<template>
  <VRow
    no-gutters
    class="auth-wrapper bg-surface"
  >
    <VCol
      lg="8"
      class="d-none d-lg-flex"
    >
      <div class="position-relative bg-background rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg
            max-width="505"
            
            class="auth-illustration mt-16 mb-2"
          />
        </div>

        <VImg
         
          class="auth-footer-mask"
        />
      </div>
    </VCol>

    <VCol
      cols="12"
      lg="4"
      class="auth-card-v2 d-flex align-center justify-center"
    >
      <VCard
        flat
        :max-width="500"
        class="mt-12 mt-sm-0 pa-4"
      >
        <VCardText>
          <VNodeRenderer
           
            class="mb-6"
          />

          <h5 class="text-h5 mb-1">
            مرحبا بك في  جامعة <span class="text-capitalize"> {{ themeConfig.app.title }} </span>! 👋🏻
          </h5>

          <p class="mb-0">
            Please sign-in to your account and start the adventure
          </p>
        </VCardText>

        <VCardText>
          <VAlert
            color="primary"
            variant="tonal"
          >
            <p class="text-caption mb-2">
              Admin Email: <strong>admin@demo.com</strong> / Pass: <strong>admin</strong>
            </p>

            <p class="text-caption mb-0">
              Client Email: <strong>client@demo.com</strong> / Pass: <strong>client</strong>
            </p>
          </VAlert>
        </VCardText>

        <VCardText>
          <VForm
            ref="refVForm"
           

          >
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <AppTextField
                  
                  label="Email"
                  type="email"
                
                  autofocus
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <AppTextField
                
                label="Password"
                
                />

                <div class="d-flex align-center flex-wrap justify-space-between mt-2 mb-4">
                  <VCheckbox
                    v-model="rememberMe"
                    label="Remember me"
                  />
                  <a
                    class="text-primary ms-2 mb-1"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>

                <VBtn
                  block
                  type="submit"
                >
                  Login
                </VBtn>
              </VCol>

              <!-- create account -->
              <VCol
                cols="12"
                class="text-center"
              >
                <span>New on our platform?</span>

                <a
                  class="text-primary ms-2"
                  href="#"
                >
                  Create an account
                </a>
              </VCol>

              <VCol
                cols="12"
                class="d-flex align-center"
              >
                <VDivider />

                <span class="mx-4">or</span>

                <VDivider />
              </VCol>

              <!-- auth providers -->
              <VCol
                cols="12"
                class="text-center"
              >
                <AuthProvider />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>



<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
</route>

