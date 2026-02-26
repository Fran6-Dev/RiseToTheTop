<template>
  <div class="min-h-screen bg-slate-100">
    <div class="max-w-5xl mx-auto px-4 py-8">
      <!-- Bouton retour -->
      <NuxtLink
        to="/"
        class="inline-flex items-center text-sm text-slate-500 hover:text-slate-800 mb-6"
      >
        <span class="mr-2">←</span> Retour aux joueurs
      </NuxtLink>

      <!-- Chargement -->
      <div v-if="pending" class="animate-pulse space-y-4">
        <div class="h-10 w-48 bg-slate-200 rounded"></div>
        <div class="h-72 bg-slate-200 rounded-2xl"></div>
      </div>

      <!-- Erreur -->
      <div
        v-else-if="error"
        class="bg-red-50 text-red-700 border border-red-200 rounded-xl p-4"
      >
        Une erreur est survenue lors du chargement du joueur.
      </div>

      <!-- Joueur introuvable -->
      <div
        v-else-if="!user"
        class="bg-white border border-slate-200 rounded-xl p-6 text-center"
      >
        <p class="text-slate-700">Joueur introuvable.</p>
      </div>

      <!-- Fiche joueur -->
      <div
        v-else
        class="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden"
      >
        <div class="md:flex">
          <!-- Photo -->
          <div
            class="md:w-1/3 bg-slate-900/90 flex items-center justify-center"
          >
            <img
              v-if="user.photo"
              :src="urlR2 + user.photo"
              alt="Photo du joueur"
              class="h-full w-full object-cover md:max-h-[420px]"
            />
            <div
              v-else
              class="h-full w-full flex items-center justify-center text-slate-300 text-sm p-6"
            >
              Aucune photo disponible
            </div>
          </div>

          <!-- Infos principales -->
          <div class="md:w-2/3 p-6 md:p-8">
            <div class="flex flex-wrap items-center gap-3 mb-4">
              <h1 class="text-2xl md:text-3xl font-semibold text-slate-900">
                {{ user.firstName }} {{ user.lastName }}
              </h1>
              <span
                class="inline-flex items-center rounded-full bg-slate-900 text-white text-xs font-medium px-3 py-1"
              >
                {{ user.role || "Poste inconnu" }}
              </span>
            </div>

            <div class="flex flex-wrap gap-2 text-xs md:text-sm mb-6">
              <span
                v-if="user.team"
                class="inline-flex items-center rounded-full bg-blue-50 text-blue-700 px-3 py-1"
              >
                🏀 Équipe : {{ user.team }}
              </span>
              <span
                v-if="user.level"
                class="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-3 py-1"
              >
                🎯 Niveau : {{ user.level }}
              </span>
              <span
                v-if="user.nationality"
                class="inline-flex items-center rounded-full bg-orange-50 text-orange-700 px-3 py-1"
              >
                🌍 {{ user.nationality }}
              </span>
              <span
                v-if="user.visible === false"
                class="inline-flex items-center rounded-full bg-slate-200 text-slate-700 px-3 py-1"
              >
                Non visible publiquement
              </span>
            </div>

            <!-- Grille de stats -->
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 text-sm">
              <div class="bg-slate-50 rounded-2xl px-4 py-3">
                <p class="text-xs text-slate-500 mb-1">Taille</p>
                <p class="font-semibold text-slate-900">
                  {{ user.height ? user.height + " cm" : "—" }}
                </p>
              </div>
              <div class="bg-slate-50 rounded-2xl px-4 py-3">
                <p class="text-xs text-slate-500 mb-1">Poids</p>
                <p class="font-semibold text-slate-900">
                  {{ user.weight ? user.weight + " kg" : "—" }}
                </p>
              </div>
              <div class="bg-slate-50 rounded-2xl px-4 py-3">
                <p class="text-xs text-slate-500 mb-1">Main Forte</p>
                <p class="font-semibold text-slate-900">
                  {{ user.hand || "—" }}
                </p>
              </div>

              <div class="bg-slate-50 rounded-2xl px-4 py-3">
                <p class="text-xs text-slate-500 mb-1">Date de naissance</p>
                <p class="font-semibold text-slate-900">
                  {{ formattedBirth }}
                </p>
              </div>

              <div class="bg-slate-50 rounded-2xl px-4 py-3">
                <p class="text-xs text-slate-500 mb-1">Disponibilité</p>
                <p class="font-semibold text-slate-900">
                  {{ user.disponibility || "Non renseigné" }}
                </p>
              </div>

              <div class="bg-slate-50 rounded-2xl px-4 py-3">
                <p class="text-xs text-slate-500 mb-1">Social Media</p>
                <p class="font-semibold text-slate-900">
                  {{ user.socialMedia || "—" }}
                </p>
              </div>

              <!-- <div class="bg-slate-50 rounded-2xl px-4 py-3">
                <p class="text-xs text-slate-500 mb-1">Email</p>
                <p class="font-semibold text-slate-900 break-all">
                  {{ user.email || "—" }}
                </p>
              </div> -->

              <!-- <div class="bg-slate-50 rounded-2xl px-4 py-3">
                <p class="text-xs text-slate-500 mb-1">Pseudo</p>
                <p class="font-semibold text-slate-900">
                  {{ user.username || "—" }}
                </p>
              </div> -->

              <div class="bg-slate-50 rounded-2xl px-4 py-3">
                <p class="text-xs text-slate-500 mb-1">Dernière mise à jour</p>
                <p class="font-semibold text-slate-900">
                  {{ formattedUpdatedAt }}
                </p>
              </div>
            </div>

            <!-- Description -->
            <div class="border-t border-slate-100 pt-4">
              <h2 class="text-sm font-semibold text-slate-900 mb-2">
                Profil / description
              </h2>
              <p class="text-sm text-slate-700 whitespace-pre-line">
                {{
                  user.description ||
                  "Aucune description renseignée pour le moment."
                }}
              </p>
            </div>

            <!-- Vidéo (optionnel) -->
            <div v-if="user.video" class="mt-6">
              <h2 class="text-sm font-semibold text-slate-900 mb-2">
                Vidéo de highlights
              </h2>

              <div
                class="w-full aspect-video overflow-hidden rounded-2xl border border-slate-200 bg-black"
              >
                <video controls class="w-full h-full object-cover">
                  <source :src="urlR2 + user.video" type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture vidéo.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const id = computed(() => route.params.id);

const urlR2 = "https://pub-aa0e4ee5d9f04aca8ce8d04a868dd903.r2.dev/";
const { data: users, pending, error } = await useFetch("/api/user/users");

const user = computed(() => users.value?.find((u) => u._id === id.value));

const formattedBirth = computed(() =>
  user.value?.birth
    ? new Date(user.value.birth).toLocaleDateString("fr-FR")
    : "—"
);

const formattedUpdatedAt = computed(() =>
  user.value?.updatedAt
    ? new Date(user.value.updatedAt).toLocaleDateString("fr-FR")
    : "—"
);

// console.log(user);
</script>
