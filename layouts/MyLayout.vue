<template>
  <div>
    <header>
      <div  class="flex justify-between bg-black text-white py-3">
        <p class="p-1">RiseToTheTop</p>
        <!-- Version mobile -->
        <button @click="toggleMobileMenu" class="block md:hidden p-1 absolute right-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        
        <nav v-if="isMobileMenuOpen" class="md:hidden flex flex-col items-center mt-4">
          <div class="absolute right-1 top-14">
            <ul class="flex flex-col bg-gray-200 text-black">
              <NuxtLink v-if="isConnected == 'authenticated'" to="/" class="my-2 text-center rounded p-1">Accueil</NuxtLink>
              <NuxtLink v-if="isConnected == 'authenticated'" to="/MyInfos" class="my-2 text-center rounded p-1">Mes informations</NuxtLink>
              <NuxtLink v-if="isConnected == 'authenticated'"to="/AboutUs" class="my-2 text-center rounded p-1">Qui sommes nous ?</NuxtLink>
              <NuxtLink v-if="isConnected == 'authenticated'"to="/ContactUs" class="my-2 text-center rounded p-1">Nous contacter</NuxtLink>
              <NuxtLink v-if="isConnected == 'authenticated'" to="/Login" class="my-2 text-center rounded p-1" @click="handleLogout">Deconnexion</NuxtLink>
              <NuxtLink v-else to="/Login" class="my-2 text-center rounded p-1">S'authentifier</NuxtLink>
            </ul>
          </div>
        </nav>
        
        <nav class="hidden md:flex">
          <ul class="flex">
            <NuxtLink v-if="isConnected == 'authenticated'" to="/" class="mx-3 text-center rounded p-1 cursor-pointer hover:underline">Accueil</NuxtLink>
            <NuxtLink v-if="isConnected == 'authenticated'" to="/MyInfos" class="mx-3 text-center rounded p-1">Mes informations</NuxtLink>
            <NuxtLink v-if="isConnected == 'authenticated'" to="/AboutUs"class="mx-3 text-center rounded p-1 cursor-pointer hover:underline">Qui sommes nous ?</NuxtLink>
            <NuxtLink v-if="isConnected == 'authenticated'" to="/ContactUs" class="mx-3 text-center rounded p-1 cursor-pointer hover:underline">Nous contacter</NuxtLink>
            <NuxtLink v-if="isConnected === 'authenticated'" to="/Login" class="mx-3 text-center rounded p-1 cursor-pointer hover:underline" @click="handleLogout">Déconnexion</NuxtLink>
            <NuxtLink v-else to="/Login" class="mx-3 text-center rounded p-1 cursor-pointer hover:underline">S'authentifier</NuxtLink>

          </ul>
        </nav>
      </div>
    </header>
    
    <slot />

    <footer class="bg-black text-white text-center py-3">
      <p>© <span>{{ year }}</span> Mon Application RiseToTheTop</p>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const year = new Date().getFullYear();

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const { status, signOut } = useAuth();

const isConnected = status.value;

async function handleLogout() {
  await signOut({callbackUrl: '/login'});
} 

console.log(isConnected);

</script>

<style>

</style>
