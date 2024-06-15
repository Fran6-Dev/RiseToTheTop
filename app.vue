<template>
  <div>
    <MyLayout>
       <NuxtPage />
    </MyLayout>
  </div>
</template>

<script>
import MyLayout from '@/layouts/MyLayout.vue';

export default {
  components: {
    MyLayout,
  },
}

</script>