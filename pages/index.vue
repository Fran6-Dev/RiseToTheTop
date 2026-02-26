<template>
  <div class="min-h-screenx">
    <div class="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <!-- Header / bienvenue -->
      <section class="mb-8">
        <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p class="text-xs uppercase tracking-[0.2em]">
              RiseToTheTop
            </p>
            <h1 class="mt-2 text-2xl md:text-3xl font-semibold">
              Bienvenue
              <span v-if="username" class="">
                {{ username }}
              </span>
              <!-- <span v-else class="">
                joueur
              </span> -->
              👋
            </h1>
            <p v-if="username" class="mt-1 text-sm">
              Gère ton profil et découvre les autres joueurs de la plateforme.
            </p>
            <p v-else class="mt-1 text-sm">
              Inscris toi, créer ton profil et découvre les autres joueurs de la plateforme.
            </p>
          </div>

          <!-- État de session -->
          <div class="mt-4 md:mt-0">
            <span
              v-if="status === 'loading'"
              class="inline-flex items-center rounded-full bg-slate-800 text-slate-300 text-xs px-3 py-1"
            >
              <span class="w-2 h-2 rounded-full bg-slate-400 mr-2 animate-pulse"></span>
              Connexion en cours...
            </span>

            <span
              v-else-if="status === 'authenticated'"
              class="inline-flex items-center rounded-full bg-emerald-500/10 text-emerald-300 text-xs px-3 py-1 border border-emerald-400/30"
            >
              <span class="w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
              Connecté
            </span>

            <span
              v-else
              class="inline-flex items-center rounded-full bg-red-500/10 text-red-300 text-xs px-3 py-1 border border-red-400/30"
            >
              <span class="w-2 h-2 rounded-full bg-red-400 mr-2"></span>
              Non authentifié
            </span>
          </div>
        </div>
      </section>

      <!-- Intro (ton composant existant) -->
      <section v-if="!username" class="mb-10">
        <Intro />
      </section>

      <!-- Section joueurs -->
      <section>
        <!-- <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-lg md:text-xl font-semibold">
              Tous les profils joueur RiseToTheTop
            </h2>
            <p class="text-sm">
              Parcours les profils publics des joueurs et consulte leurs fiches détaillées.
            </p>
          </div>
        </div> -->

        <div class="rounded-3xl">
          <PlayerCard />
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
// definePageMeta({
//   middleware: 'guest'
// })

const { data: session, status } = useAuth()

// Pseudo lisible dans le template
const username = computed(() => session.value?.user?.username as string | undefined)

// Simple log dev si besoin
const userId = computed(() => session.value?.user?.id)

watchEffect(() => {
  if (status.value === 'authenticated') {
    // console.log('ID:', userId.value)
  }
})
</script>

