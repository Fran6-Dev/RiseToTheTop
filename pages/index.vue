<template>
  <div class="px-5">
    <!-- <Banner /> -->
    <Intro />
    <p>Bienvenue {{ (session?.user as any)?.username }}</p>
    <p>test id {{ (session?.user as any)?.id }}</p>
    <!-- <h3 class="p-2">Top profil joueur RiseToTheTop de la semaine !</h3>
    <PlayerCard /> -->
    <h3 class="mt-10 p-2">Tous les profils joueur RiseToTheTop !</h3>
    <PlayerCard />

  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth'
})

const { data: session, status } = useAuth()

const userId = computed(() => session.value?.user?.id)

watchEffect(() => {
  if (status.value === 'authenticated'){
    console.log('ID:', userId.value)
  }
})


</script>

<style>

</style>