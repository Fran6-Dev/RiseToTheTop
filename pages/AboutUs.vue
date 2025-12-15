<template>
  <div class="min-h-screen bg-slate-100">
    <div class="max-w-5xl mx-auto px-4 py-10">
      <section
        class="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
      >
        <div class="grid md:grid-cols-2">
          <!-- Texte -->
          <div class="p-6 md:p-10 flex flex-col justify-center">
            <p class="text-xs uppercase tracking-[0.25em] text-slate-400 mb-3">
              À propos
            </p>
            <h2 class="text-2xl md:text-3xl font-semibold text-slate-900 mb-4">
              Qui sommes-nous&nbsp;?
            </h2>

            <div class="space-y-3 text-sm md:text-base text-slate-600 leading-relaxed">
              <p>
                Bienvenue dans notre startup dédiée à l'augmentation de la visibilité
                des basketteurs et basketteuses&nbsp;! Nous sommes passionnés de basketball
                et nous croyons que chaque joueur et joueuse mérite une plateforme pour
                se faire connaître et être reconnu pour ses talents.
              </p>

              <p>
                Notre objectif est de fournir une solution innovante pour aider les
                joueurs et joueuses à se connecter avec les recruteurs, les entraîneurs
                et les équipes partout dans le monde. Sur notre plateforme, tu peux
                créer un profil complet, publier tes vidéos et entrer en contact avec
                les bonnes personnes.
              </p>

              <p>
                Nous savons que la visibilité est la clé du succès. C'est pourquoi nous
                avons conçu un outil qui permet aux recruteurs de trouver facilement des
                profils talentueux, et d'évaluer les joueurs de manière plus objective.
              </p>

              <p>
                Notre équipe est animée par une vraie passion pour le basket et la
                volonté de donner une chance à tous les joueurs de montrer leur talent.
                Nous sommes impatients de t’accueillir sur RiseToTheTop et de t’aider à
                franchir un cap.
              </p>

              <p class="font-medium text-slate-900 pt-2">
                Rejoins-nous dès maintenant et montre au monde de quoi tu es capable&nbsp;!
              </p>
            </div>
          </div>

          <!-- Image -->
          <div class="relative hidden md:block">
            <img
              src="/assets/8a226c46-ec44-4ef7-bba9-05f3626e40dd.jpg"
              alt="Joueurs de basket sur le terrain"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent" />
            <div class="absolute bottom-4 left-4 text-xs text-slate-100">
              <p class="font-medium">RiseToTheTop</p>
              <p class="text-[11px] text-slate-200">
                La plateforme pour les basketteurs qui visent plus haut.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['auth']
})
</script>

<style></style>
