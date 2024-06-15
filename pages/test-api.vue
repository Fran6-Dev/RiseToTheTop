<script setup lang="ts">
const { data } = await useFetch('/api/users')
</script>

<template>
  <pre>{{ data.users }}</pre>
</template>