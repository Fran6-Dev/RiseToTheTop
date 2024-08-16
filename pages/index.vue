<template>
  <div>
    <Banner />
    <Intro />
    <p>Bienvenue {{ (data?.user as any)?.username }}</p>
    <h3 class="p-2">Top profil joueur RiseToTheTop de la semaine !</h3>
    <PlayerCard />
    <h3 class="mt-10 p-2">Tous les profils joueur RiseToTheTop !</h3>
    <PlayerCard />

  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth'
})

const { data } = useAuth()


</script>

<style>

</style>