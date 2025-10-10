<template>
  <NuxtLayout>
    <MyLayout>
       <NuxtPage />
    </MyLayout>
  </NuxtLayout>
</template>

<script>
import MyLayout from '@/layouts/MyLayout.vue';

export default {
  components: {
    MyLayout,
  },
}

</script>