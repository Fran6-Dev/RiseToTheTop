<template>
    <h3>Mes informations personnelles</h3>
   
   <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Informations personnelles -->
      <section>
        <h3 class="text-lg font-semibold mb-2">Informations personnelles</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-medium mb-1">Prénom</label>
            <input v-model="form.firstName" type="text" class="w-full border rounded p-2" required />
          </div>

          <div>
            <label class="block font-medium mb-1">Nom</label>
            <input v-model="form.lastName" type="text" class="w-full border rounded p-2" required />
          </div>

          <div>
            <label class="block font-medium mb-1">Date de naissance</label>
            <input v-model="form.birth" type="date" class="w-full border rounded p-2" required />
          </div>

          <div>
            <label class="block font-medium mb-1">Nationalité</label>
            <input v-model="form.nationality" type="text" class="w-full border rounded p-2" required />
          </div>

          <div>
            <label class="block font-medium mb-1">Taille (cm)</label>
            <input v-model.number="form.height" type="number" class="w-full border rounded p-2" required />
          </div>
        </div>
      </section>

      <!-- Informations sportives -->
      <section>
        <h3 class="text-lg font-semibold mb-2">Informations sportives</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-medium mb-1">Poste</label>
            <select v-model="form.role" class="w-full border rounded p-2" required>
              <option value="">-- Choisir un poste --</option>
              <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
            </select>
          </div>

          <div>
            <label class="block font-medium mb-1">Équipe actuelle</label>
            <input v-model="form.team" type="text" class="w-full border rounded p-2" />
          </div>

          <div>
            <label class="block font-medium mb-1">Niveau</label>
            <select v-model="form.level" class="w-full border rounded p-2" required>
              <option value="">-- Choisir un niveau --</option>
              <option v-for="lvl in levels" :key="lvl" :value="lvl">{{ lvl }}</option>
            </select>
          </div>

          <div>
            <label class="block font-medium mb-1">Disponibilité</label>
            <input v-model="form.disponibility" type="text" class="w-full border rounded p-2" placeholder="Ex: Immédiate, Fin de saison..." />
          </div>
        </div>
      </section>

      <!-- Médias -->
      <section>

        <FileUploader />

        <h3 class="text-lg font-semibold mb-2">Médias</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-medium mb-1">Photo (URL)</label>
            <input v-model="form.photo" type="url" class="w-full border rounded p-2" placeholder="https://..." />
          </div>

          <div>
            <label class="block font-medium mb-1">Vidéo (URL)</label>
            <input v-model="form.video" type="url" class="w-full border rounded p-2" placeholder="https://..." />
          </div>
        </div>
      </section>

      <!-- Description -->
      <section>
        <h3 class="text-lg font-semibold mb-2">Description</h3>
        <textarea
          v-model="form.description"
          rows="4"
          class="w-full border rounded p-2"
          placeholder="Décris ton profil, ton style de jeu, tes objectifs..."
        ></textarea>
      </section>

      <!-- Bouton d’envoi -->
      <div class="pt-4">
        <button
          type="submit"
          class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          :disabled="loading"
        >
          {{ loading ? 'Envoi...' : 'Enregistrer le profil' }}
        </button>

        <p v-if="successMessage" class="text-green-600 mt-3">{{ successMessage }}</p>
        <p v-if="errorMessage" class="text-red-600 mt-3">{{ errorMessage }}</p>
      </div>
    </form>

</template>

<script lang="ts" setup>

import { useUserStore } from '~/stores/user'
// import { User } from '~/server/models/User';
import FileUploader from '~/components/FileUploader.vue';

definePageMeta({
  middleware : ['auth']
})

// const userMe = ref<User | null>(null);

// async function getPlayerInfo(){
//   try{
// const user = await $fetch<User>('/api/user/me');
// userMe.value = user;
//   }
//   catch(e){
//     console.log(e)

//   }
// }
// getPlayerInfo()

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
  firstName: '',
  lastName: '',
  birth: '',
  nationality: '',
  height: null,
  role: '',
  team: '',
  level: '',
  disponibility: '',
  photo: '',
  video: '',
  description: ''
})

//  Options des listes déroulantes
const roles = [
  'Meneur (1)',
  'Arrière (2)',
  'Ailier (3)',
  'Ailier fort (4)',
  'Pivot (5)'
]

const levels = [
  'NBA',
  'EuroLeague',
  'Pro A / Betclic Élite',
  'Pro B',
  'Nationale 1 (NM1)',
  'Nationale 2 (NM2)',
  'Nationale 3 (NM3)',
  'Région 1 (RM1 / RF1)',
  'Région 2 (RM2 / RF2)',
  'Région 3 (RM3 / RF3)',
  'Départemental 1 (DM1 / DF1)',
  'Départemental 2 (DM2 / DF2)',
  'Départemental 3 (DM3 / DF3)',
  'Loisir',
  'Autre'
]

// États d’envoi
const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')


const loadUserProfile = async () => {
  try {
    const user = await $fetch<PlayerForm>('/api/user/profil', { method: 'GET' })

    // Remplir le formulaire avec les données récupérées
    form.value = {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      birth: user.birth ? user.birth.slice(0, 10) : '', // format YYYY-MM-DD
      nationality: user.nationality || '',
      height: user.height || null,
      role: user.role || '',
      team: user.team || '',
      level: user.level || '',
      disponibility: user.disponibility || '',
      photo: user.photo || '',
      video: user.video || '',
      description: user.description || ''
    }
  } catch (err) {
    console.error('Erreur lors du chargement du profil :', err)
  }
}

onMounted(() => {
  loadUserProfile()
})

// Fonction d’envoi
const handleSubmit = async () => {
  loading.value = true
  successMessage.value = ''
  errorMessage.value = ''
  try {
    const res = await $fetch('/api/user/profil', {
      method: 'POST',
      body: form.value
    })
    successMessage.value = 'Profil enregistré avec succès !'
    form.value = {
      firstName: '',
      lastName: '',
      birth: '',
      nationality: '',
      height: null,
      role: '',
      team: '',
      level: '',
      disponibility: '',
      photo: '',
      video: '',
      description: ''
    }
  } catch (err) {
    errorMessage.value = 'Une erreur est survenue lors de l’enregistrement.'
  } finally {
    loading.value = false
  }

  
}

</script>