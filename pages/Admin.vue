<template>
  <div>
    <h2 class="text-2xl font-semibold mb-6">Liste des joueurs</h2>

    <!-- Loader -->
    <div v-if="pending" class="text-sm text-slate-500">Chargement...</div>

    <!-- Erreur -->
    <div v-else-if="error" class="text-sm text-red-600">
      Erreur : {{ error.message }}
    </div>

    <!-- Tableau -->
    <div
      v-else
      class="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm"
    >
      <table class="min-w-full text-sm text-slate-700">
        <thead class="bg-slate-50 text-xs uppercase text-slate-500 border-b">
          <tr>
            <th class="px-4 py-3 text-left">Photo</th>
            <th class="px-4 py-3 text-left">Nom</th>
            <th class="px-4 py-3 text-left">Email</th>
            <th class="px-4 py-3 text-left">Rôle</th>
            <th class="px-4 py-3 text-left">Taille</th>
            <th class="px-4 py-3 text-left">Niveau</th>
            <th class="px-4 py-3 text-left">Équipe</th>
            <th class="px-4 py-3 text-left">Disponible</th>
            <th class="px-4 py-3 text-left">Vidéo</th>
            <th class="px-4 py-3 text-left">Visible</th>
            <th class="px-4 py-3 text-left">Admin</th>
            <th class="px-4 py-3 text-left">Créé le</th>
            <th class="px-4 py-3 text-left">Supprimer</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="u in users"
            :key="u._id"
            class="border-b last:border-0 hover:bg-slate-50"
          >
            <!-- Photo -->
            <td class="px-4 py-3">
              <img
                v-if="u.photo"
                :src="urlR2 + u.photo"
                class="h-12 w-12 rounded object-cover border"
              />
              <div
                v-else
                class="h-12 w-12 bg-slate-200 rounded flex items-center justify-center text-xs text-slate-500"
              >
                N/A
              </div>
            </td>

            <!-- Nom -->
            <td class="px-4 py-3">
              {{ u.firstName || "—" }} {{ u.lastName || "" }}
            </td>

            <!-- Email -->
            <td class="px-4 py-3 text-slate-500">
              {{ u.email }}
            </td>

            <!-- Rôle (poste) -->
            <td class="px-4 py-3">
              {{ u.role || "—" }}
            </td>

            <!-- Taille -->
            <td class="px-4 py-3">
              {{ u.height ? `${u.height} cm` : "—" }}
            </td>

            <!-- Niveau -->
            <td class="px-4 py-3">
              {{ u.level || "—" }}
            </td>

            <!-- Équipe -->
            <td class="px-4 py-3">
              {{ u.team || "—" }}
            </td>

            <!-- Disponibilité -->
            <td class="px-4 py-3">
              {{ u.disponibility || "—" }}
            </td>

            <!-- Vidéo -->
            <td class="px-4 py-3">
              <a
                v-if="u.video"
                :href="urlR2 + u.video"
                target="_blank"
                class="text-blue-600 hover:underline text-xs"
              >
                Voir la vidéo
              </a>
              <span v-else>—</span>
            </td>

            <!-- Visibilité -->
            <td class="px-4 py-3">
              <button
              @click="toggleVisible(u)"
                :class="[
                  'relative inline-flex h-5 w-10 items-center rounded-full transition',
                  u.visible ? 'bg-emerald-500' : 'bg-slate-300',
                ]"
              >
                <span
                  :class="[
                    'inline-block h-4 w-4 transform rounded-full bg-white transition',
                    u.visible ? 'translate-x-5' : 'translate-x-1',
                  ]"
                />
              </button>
            </td>

            <!-- Admin -->
            <td class="px-4 py-3">
              <span
                v-if="u.accountRole === 'admin'"
                class="px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-700"
              >
                Admin
              </span>
              <span v-else class="text-slate-400 text-xs">—</span>
            </td>

            <!-- Date création -->
            <td class="px-4 py-3 text-slate-500">
              {{ formatDate(u.createdAt) }}
            </td>

            <!-- Supprimer -->

            <td class="px-4 py-3">
              <button
                @click="toggleDeleted(u)"
                :class="[
                  'relative inline-flex h-5 w-10 items-center rounded-full transition',
                  u.isDeleted ? 'bg-red-500' : 'bg-slate-300',
                ]"
              >
                <span
                  :class="[
                    'inline-block h-4 w-4 transform rounded-full bg-white transition',
                    u.isDeleted ? 'translate-x-5' : 'translate-x-1',
                  ]"
                />
              </button>
            </td>
          </tr>

          <!-- Aucun joueur -->
          <tr v-if="users.length === 0">
            <td colspan="11" class="text-center py-6 text-slate-500">
              Aucun joueur trouvé.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth", "admin"],
});

// URL cloudflare R2
const urlR2 = "https://pub-aa0e4ee5d9f04aca8ce8d04a868dd903.r2.dev/";

// Récup users
const { data: users, pending, error } = await useFetch("/api/user/users");

// console.log(users.value)

// Format date
const formatDate = (dateString) => {
  if (!dateString) return "—";
  const d = new Date(dateString);
  return d.toLocaleDateString("fr-FR");
};

const toggleVisible = async (user) => {
  user.visible = !user.visible
  
  await $fetch(`/api/admin/users/${user._id}/visibility`, {
    method: 'PATCH',
    body: { visible: user.visible }
  })
}

const toggleDeleted = async (user) => {
  user.isDeleted = !user.isDeleted

  await $fetch(`/api/admin/users/${user._id}/delete`, {
    method: 'PATCH',
    body: { isDeleted: user.isDeleted }
  })
}

</script>
