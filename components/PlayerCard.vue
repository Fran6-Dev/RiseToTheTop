<template>
  <div class="min-h-screen bg-slate-100">
    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Titre -->
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl md:text-3xl font-semibold text-slate-900">
          Liste des joueurs
        </h1>
        <p class="text-sm text-slate-500" v-if="filteredUsers.length">
          {{ filteredUsers.length }} joueur<span v-if="filteredUsers.length > 1">s</span>
        </p>
      </div>

      <!-- États de chargement / erreur -->
      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="n in 6"
          :key="n"
          class="bg-white rounded-3xl shadow-sm border border-slate-200 p-4 animate-pulse"
        >
          <div class="w-full aspect-video bg-slate-200 rounded-2xl mb-4"></div>
          <div class="h-4 bg-slate-200 rounded mb-2 w-3/4"></div>
          <div class="h-3 bg-slate-200 rounded mb-1 w-1/2"></div>
          <div class="h-3 bg-slate-200 rounded w-1/3"></div>
        </div>
      </div>

      <div
        v-else-if="error"
        class="bg-red-50 text-red-700 border border-red-200 rounded-xl p-4"
      >
        Erreur : {{ error.message }}
      </div>

      <!-- Liste des joueurs filtrés -->
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <NuxtLink
          v-for="user in filteredUsers"
          :key="user._id"
          :to="`/player/${user._id}`"
          class="group bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col"
        >
          <!-- Image -->
          <div class="w-full h-100 bg-slate-900/90 overflow-hidden">
            <img
              v-if="user.photo"
              :src="urlR2 + user.photo"
              alt="Photo de {{ user.firstName }} {{ user.lastName }}"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
            <img v-else src="/assets/icon-person.jpg"/>
            <!-- <div
              v-else
              class="w-full h-full flex items-center justify-center text-xs text-slate-200"
            >
              Aucune photo disponibility
            </div> -->
          </div>

          <!-- Contenu -->
          <div class="p-4 flex flex-col flex-1">
            <div class="flex items-start justify-between gap-2 mb-2">
              <h2 class="text-lg font-semibold text-slate-900 leading-tight">
                {{ user.firstName }} {{ user.lastName }}
              </h2>
              <span
                v-if="user.role"
                class="inline-flex items-center rounded-full bg-slate-900 text-white text-[10px] font-medium px-2 py-1"
              >
                {{ user.role }}
              </span>
            </div>

            <p class="text-sm text-slate-600 mb-1">
              <span v-if="user.team">{{ user.team }}</span>
              <span v-if="user.team && user.level"> · </span>
              <span v-if="user.level">{{ user.level }}</span>
            </p>

            <p class="text-xs text-slate-500 mb-3">
              {{ user.nationality || 'Nationalité non renseignée' }}
            </p>

            <div class="mt-auto flex items-center justify-between text-xs text-slate-500">
              <span class="inline-flex items-center gap-1 group-hover:text-blue-600">
                Voir le profil
                <span class="text-sm">→</span>
              </span>
            </div>
          </div>
        </NuxtLink>

        <!-- Cas où le filtre ne trouve personne -->
        <div
          v-if="!filteredUsers.length"
          class="col-span-full text-center text-slate-500 text-sm"
        >
          Aucun joueur visible pour le moment.
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const urlR2 = 'https://pub-aa0e4ee5d9f04aca8ce8d04a868dd903.r2.dev/'

export interface User {
  _id: string
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

// On filtre ici : visible = true et isDeleted = false
const filteredUsers = computed(
  () => (users.value || []).filter(u => u.visible && !u.isDeleted)
)

// console.log(filteredUsers.value)
</script>
