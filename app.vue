<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '~/stores/user'
import MyLayout from './layouts/MyLayout.vue'

const { data: session, status } = useAuth()

onMounted(() => {
  const userStore = useUserStore()
  watch([status, session], () => {
    userStore.setUserId(
      status.value === 'authenticated' ? session.value?.user?.id ?? null : null
    )
  }, { immediate: true })
})
// console.log(useUserStore);
</script>

<template>
  <MyLayout>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </MyLayout>

</template>
