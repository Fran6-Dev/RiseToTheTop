<template>
  <section class="w-full py-10">
    <div class="max-w-4xl mx-auto px-4">
      <div
        class="rounded-3xl bg-white shadow-sm border border-slate-200 px-6 py-8 md:px-10 md:py-10 text-center"
      >
        <p class="text-xs uppercase tracking-[0.25em] text-slate-400 mb-3">
          RiseToTheTop
        </p>

        <h2 class="text-2xl md:text-3xl font-semibold text-slate-900 mb-4">
          Augmente ta visibilité grâce à
          <span class="text-blue-600">RiseToTheTop</span> !
        </h2>

        <p class="text-sm md:text-base text-slate-600 mb-2">
          Inscris-toi, crée ton profil, partage tes vidéos et fais-toi connaître aux yeux de tous.
        </p>
        <p class="text-sm md:text-base text-slate-600 mb-1">
          RiseToTheTop, l'application qui t'aide à atteindre le sommet.
        </p>
        <p class="text-sm md:text-base text-slate-600 mb-6">
          Affiche ton talent et marque l'histoire du basketball avec nous.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
          <NuxtLink
            to="/MyInfos"
            class="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition"
          >
            Créer mon profil joueur
          </NuxtLink>

          <NuxtLink
            to="/AboutUs"
            class="text-xs sm:text-sm text-slate-500 hover:text-slate-700"
          >
            En savoir plus sur la plateforme →
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
</script>

<style></style>
