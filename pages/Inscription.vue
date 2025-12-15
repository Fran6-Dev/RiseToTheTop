<template>
  <div class="min-h-screen grid lg:grid-cols-2 bg-slate-100">
    <!-- Colonne gauche : image basket -->
    <div class="relative hidden lg:flex">
      <img
        src="/assets/img-inscription.jpg"
        alt="Joueurs de basket"
        class="w-full h-full object-cover"
      />

      <!-- Overlay sombre -->
      <div class="absolute inset-0 bg-slate-900/70"></div>

      <!-- Texte par-dessus -->
      <div class="absolute inset-0 flex flex-col justify-between p-8 text-slate-100">
        <div class="text-xs uppercase tracking-[0.2em] text-slate-300">
          RiseToTheTop
        </div>

        <div>
          <h1 class="text-3xl font-semibold mb-3">
            Rejoins les meilleurs joueurs.
          </h1>
          <p class="text-sm text-slate-200 max-w-xs">
            Crée ton profil, partage tes highlights et laisse les coachs et clubs venir à toi.
          </p>
        </div>

        <p class="text-[11px] text-slate-400">
          Plateforme dédiée aux joueurs de basket qui veulent passer au niveau supérieur.
        </p>
      </div>
    </div>

    <!-- Colonne droite : formulaire -->
    <div class="flex items-center justify-center px-4 py-10">
      <div class="w-full max-w-md">
        <!-- Logo / titre -->
        <div class="mb-8 text-center">
          <p class="text-xs uppercase tracking-[0.2em] text-slate-500">
            Inscription
          </p>
          <h2 class="mt-2 text-2xl font-semibold text-slate-900">
            Welcome !
          </h2>
          <p class="mt-1 text-sm text-slate-500">
            Crée ton compte et commence ton ascension.
          </p>
        </div>

        <!-- Formulaire -->
        <form @submit.prevent="handleFormSubmit" class="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium text-slate-700 mb-1">
              Nom d'utilisateur
            </label>
            <input
              id="username"
              class="block w-full rounded-xl border-0 px-3.5 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
              type="text"
              placeholder="LeBron23"
              v-model="form.username"
              required
            >
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              id="email"
              class="block w-full rounded-xl border-0 px-3.5 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
              type="email"
              placeholder="johndoe@example.com"
              v-model="form.email"
              required
            >
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-slate-700 mb-1">
              Mot de passe
            </label>
            <input
              id="password"
              class="block w-full rounded-xl border-0 px-3.5 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
              type="password"
              placeholder="••••••••"
              v-model="form.password"
              required
            >
          </div>

          <button
            class="mt-2 block w-full rounded-xl bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
            type="submit"
            :disabled="isLoading"
          >
            <span v-if="!isLoading">S'inscrire</span>
            <span v-else>Création du compte...</span>
          </button>

          <p class="text-xs text-slate-500 text-center mt-3">
            Déjà un compte ?
            <NuxtLink
              :to="{ name: 'Login' }"
              class="font-medium text-blue-600 hover:text-blue-700"
            >
              Se connecter
            </NuxtLink>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const form = ref({
  username: '',
  email: '',
  password: '',
})

const isLoading = ref(false)
const router = useRouter()

async function handleFormSubmit () {
  try {
    isLoading.value = true

    await useFetch('/api/auth/inscription', {
      method: 'POST',
      body: form.value
    })

    router.push({ name: 'Login' })
  } catch (e: any) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
}
</script>

<style></style>
