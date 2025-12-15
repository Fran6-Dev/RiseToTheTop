<template>
  <div class="max-w-5xl mx-auto px-4 py-10">
    <!-- TITRE -->
    <div class="mb-10 text-center">
      <h1 class="text-2xl md:text-3xl font-semibold text-slate-900">Mes informations personnelles</h1>
      <p class="text-sm text-slate-500 mt-1">
        Modifie ton profil joueur pour augmenter ta visibilité !
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-12 bg-white border border-slate-200 rounded-3xl shadow-sm p-6 md:p-10">

      <!-- SECTION : Informations personnelles -->
      <section>
        <h2 class="text-xl font-semibold text-slate-900 mb-4">Informations personnelles</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormInput label="Prénom" v-model="form.firstName" required />
          <FormInput label="Nom" v-model="form.lastName" required />
          <FormInput label="Date de naissance" type="date" v-model="form.birth" required />
          <FormInput label="Nationalité" v-model="form.nationality" required />
          <FormInput label="Taille (cm)" type="number" v-model="form.height" required />
        </div>
      </section>

      <!-- SECTION : Informations sportives -->
      <section>
        <h2 class="text-xl font-semibold text-slate-900 mb-4">Informations sportives</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormSelect label="Poste" v-model="form.role" :options="roles" required />
          <FormInput label="Équipe actuelle" v-model="form.team" />
          <FormSelect label="Niveau" v-model="form.level" :options="levels" required />
          <FormInput label="Disponibilité" v-model="form.disponibility" placeholder="Ex : Immédiate, Fin de saison..." />
        </div>
      </section>

      <!-- SECTION : Médias -->
      <section>
        <h2 class="text-xl font-semibold text-slate-900 mb-4">Médias</h2>

        <!-- IMAGE PROFIL -->
        <div class="mb-6">
          <h3 class="font-medium mb-2">Image de profil</h3>
          <FileUploader />
          <div v-if="form.photo" class="w-full overflow-hidden mt-3">
            <img :src="urlR2 + form.photo" class="object-cover" />
          </div>
        </div>

        <!-- VIDEO -->
        <div>
          <h3 class="font-medium mb-2">Vidéo Highlight</h3>
          <FileUploader />
          <div v-if="form.video" class="w-full aspect-video rounded-2xl overflow-hidden bg-black mt-3">
            <video :src="urlR2 + form.video" controls class="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <!-- SECTION : Description -->
      <section>
        <h2 class="text-xl font-semibold text-slate-900 mb-2">Description</h2>
        <textarea
          v-model="form.description"
          rows="5"
          class="w-full rounded-2xl border border-slate-300 focus:ring-2 focus:ring-blue-600 p-3"
          placeholder="Décris ton style de jeu, ton profil, tes objectifs..."
        ></textarea>
      </section>

      <!-- BOUTON -->
      <div class="pt-6 text-center">
        <button
          type="submit"
          class="rounded-full bg-blue-600 px-8 py-3 text-white font-semibold shadow-sm hover:bg-blue-700 transition disabled:opacity-40"
          :disabled="loading"
        >
          {{ loading ? 'Envoi...' : 'Enregistrer le profil' }}
        </button>

        <p v-if="successMessage" class="text-green-600 mt-4">{{ successMessage }}</p>
        <p v-if="errorMessage" class="text-red-600 mt-4">{{ errorMessage }}</p>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import FileUploader from "~/components/FileUploader.vue"
import FormInput from "~/components/ui/FormInput.vue"
import FormSelect from "~/components/ui/FormSelect.vue"

definePageMeta({
  middleware: ["auth"]
})

const urlR2 =
  "https://pub-aa0e4ee5d9f04aca8ce8d04a868dd903.r2.dev/"

interface PlayerForm {
  firstName: string
  lastName: string
  birth: string
  nationality: string
  height: number | null
  role: string
  team: string
  level: string
  disponibility: string
  photo: string
  video: string
  description: string
}

const form = ref<PlayerForm>({
  firstName: "",
  lastName: "",
  birth: "",
  nationality: "",
  height: null,
  role: "",
  team: "",
  level: "",
  disponibility: "",
  photo: "",
  video: "",
  description: ""
})

const roles = ["Meneur (1)", "Arrière (2)", "Ailier (3)", "Ailier fort (4)", "Pivot (5)"]

const levels = [
  "NBA",
  "EuroLeague",
  "Pro A / Betclic Élite",
  "Pro B",
  "Nationale 1 (NM1)",
  "Nationale 2 (NM2)",
  "Nationale 3 (NM3)",
  "Région 1 (RM1 / RF1)",
  "Région 2 (RM2 / RF2)",
  "Région 3 (RM3 / RF3)",
  "Départemental 1",
  "Départemental 2",
  "Départemental 3",
  "Loisir",
  "Autre"
]

// Messages
const loading = ref(false)
const successMessage = ref("")
const errorMessage = ref("")

// Charger infos
const loadUserProfile = async () => {
  try {
    const user = await $fetch<PlayerForm>("/api/user/profil", { method: "GET" })
    form.value = {
      ...user,
      birth: user.birth ? user.birth.slice(0, 10) : ""
    }
  } catch (err) {
    console.error("Erreur chargement profil :", err)
  }
}

onMounted(() => {
  loadUserProfile()
})

// Envoi
const handleSubmit = async () => {
  loading.value = true
  errorMessage.value = ""
  successMessage.value = ""

  try {
    await $fetch("/api/user/profil", { method: "POST", body: form.value })
    successMessage.value = "Profil enregistré avec succès !"
  } catch (err) {
    errorMessage.value = "Erreur lors de l’enregistrement."
  } finally {
    loading.value = false
  }
}
</script>
