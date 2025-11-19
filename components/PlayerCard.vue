<template>
  <div>
  <h2>Liste des joueurs</h2>
  <div v-if="pending">Chargement...</div>
  <div v-else-if="error">Erreur : {{ error.message }}</div>

  <div v-else class="grid grid-cols gap-4">
    <div v-for="user in users" :key="user.id" class="p-4 border rounded">
        <img :src=" urlR2 + user.photo" alt="photo joueur" class="w-32 h-32 object-cover " />
        <h2>{{ user.firstName }} {{ user.lastName }}</h2>
        <p>{{ user.team }} - {{ user.level }}</p>
        <p>{{ user.role }}</p>
    </div>
  </div>
</div>
</template>

<script lang="ts" setup>

const urlR2 = "https://pub-aa0e4ee5d9f04aca8ce8d04a868dd903.r2.dev/";

export interface User {
  id: string
  email: string
  username: string
  firstName?: string
  lastName?: string
  birth?: string
  nationality?: string
  height?: number
  role?: string
  team?: string
  level?: string
  disponibility?: string
  photo?: string
  video?: string
  description?: string
  visible: boolean
  isDeleted: boolean
}


const { data: users, pending, error } = await useFetch<User[]>('/api/user/users')

</script>

<style></style>