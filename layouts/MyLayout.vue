<template>
  <div class="min-h-screen flex flex-col bg-slate-100">
    <!-- HEADER -->
    <header class="bg-slate-950 text-white border-b border-slate-800">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex h-16 items-center justify-between">
          <!-- Logo / brand -->
          <NuxtLink to="/" class="flex items-center gap-2">
            <div class="h-8 w-8 rounded-xl bg-blue-500 flex items-center justify-center text-xs font-bold">
              RT
            </div>
            <div class="flex flex-col leading-tight">
              <span class="text-sm font-semibold">RiseToTheTop</span>
              <span class="text-[11px] text-slate-400">Basket players platform</span>
            </div>
          </NuxtLink>

          <!-- Desktop nav -->
          <nav class="hidden md:flex items-center gap-6">
            <template v-if="isAuthenticated">
              <NuxtLink
                to="/"
                class="text-sm text-slate-200 hover:text-white hover:underline"
              >
                Accueil
              </NuxtLink>
              <NuxtLink
                to="/MyInfos"
                class="text-sm text-slate-200 hover:text-white hover:underline"
              >
                Mes informations
              </NuxtLink>
              <NuxtLink
                to="/AboutUs"
                class="text-sm text-slate-200 hover:text-white hover:underline"
              >
                Qui sommes-nous ?
              </NuxtLink>
              <NuxtLink
                to="/ContactUs"
                class="text-sm text-slate-200 hover:text-white hover:underline"
              >
                Nous contacter
              </NuxtLink>
            </template>

            <div class="h-6 w-px bg-slate-700 mx-1" />

            <template v-if="isAuthenticated">
              <span class="text-xs text-slate-300 mr-2">
                {{ username ? `Connecté en tant que ${username}` : 'Connecté' }}
              </span>
              <button
                @click="handleLogout"
                class="text-sm font-medium text-red-300 hover:text-red-200"
              >
                Déconnexion
              </button>
            </template>

            <template v-else>
              <NuxtLink
                to="/Login"
                class="text-sm text-slate-200 hover:text-white hover:underline"
              >
                Se connecter
              </NuxtLink>
              <NuxtLink
                to="/Inscription"
                class="text-sm rounded-full bg-blue-600 px-3 py-1 font-medium hover:bg-blue-500"
              >
                S'inscrire
              </NuxtLink>
            </template>
          </nav>

          <!-- Mobile : bouton menu -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg hover:bg-slate-800"
          >
            <svg
              v-if="!isMobileMenuOpen"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Mobile nav -->
        <transition name="fade">
          <nav
            v-if="isMobileMenuOpen"
            class="md:hidden border-t border-slate-800 pb-3"
          >
            <ul class="flex flex-col pt-2 space-y-1 text-sm">
              <template v-if="isAuthenticated">
                <NuxtLink
                  to="/"
                  class="px-2 py-2 rounded-lg hover:bg-slate-800"
                  @click="closeMobileMenu"
                >
                  Accueil
                </NuxtLink>
                <NuxtLink
                  to="/MyInfos"
                  class="px-2 py-2 rounded-lg hover:bg-slate-800"
                  @click="closeMobileMenu"
                >
                  Mes informations
                </NuxtLink>
                <NuxtLink
                  to="/AboutUs"
                  class="px-2 py-2 rounded-lg hover:bg-slate-800"
                  @click="closeMobileMenu"
                >
                  Qui sommes-nous ?
                </NuxtLink>
                <NuxtLink
                  to="/ContactUs"
                  class="px-2 py-2 rounded-lg hover:bg-slate-800"
                  @click="closeMobileMenu"
                >
                  Nous contacter
                </NuxtLink>
                <button
                  @click="() => { handleLogout(); closeMobileMenu() }"
                  class="text-left px-2 py-2 rounded-lg hover:bg-slate-800 text-red-300"
                >
                  Déconnexion
                </button>
              </template>

              <template v-else>
                <NuxtLink
                  to="/Login"
                  class="px-2 py-2 rounded-lg hover:bg-slate-800"
                  @click="closeMobileMenu"
                >
                  Se connecter
                </NuxtLink>
                <NuxtLink
                  to="/Inscription"
                  class="px-2 py-2 rounded-lg hover:bg-slate-800"
                  @click="closeMobileMenu"
                >
                  S'inscrire
                </NuxtLink>
              </template>
            </ul>
          </nav>
        </transition>
      </div>
    </header>

    <!-- CONTENU -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- FOOTER -->
    <footer class="bg-slate-950 text-slate-400 text-center py-4 text-xs mt-8">
      <p>
        © {{ year }} RiseToTheTop · Tous droits réservés
      </p>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const year = new Date().getFullYear()

const isMobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const { status, data, signOut } = useAuth()

// Réactif (contrairement à ton const isConnected = status.value)
const isAuthenticated = computed(() => status.value === 'authenticated')
const username = computed(() => data.value?.user?.username as string | undefined)

async function handleLogout () {
  await signOut({ callbackUrl: '/Login' })
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
