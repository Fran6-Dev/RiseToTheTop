<template>
  <div class="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-2xl border border-gray-100">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Paramètres du compte</h2>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-6">
        <div class="col-span-2">
          <h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Informations publiques</h3>
        </div>
        <FormInput label="Email" v-model="form.email" type="email" placeholder="votre@email.com" />
        <FormInput label="Nom d'utilisateur" v-model="form.username" placeholder="Pseudo" />
        
        <div class="flex items-center justify-between col-span-2 p-4 bg-gray-50 rounded-xl">
          <div>
            <span class="block font-medium text-gray-700">Profil public</span>
            <span class="text-xs text-gray-500">Rendre votre profil visible par les autres utilisateurs</span>
          </div>
          <button 
            type="button"
            @click="form.visible = !form.visible"
            :class="form.visible ? 'bg-blue-600' : 'bg-gray-300'"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ring-2 ring-offset-2 ring-transparent focus:ring-blue-500"
          >
            <span 
              :class="form.visible ? 'translate-x-6' : 'translate-x-1'"
              class="inline-block h-4 w-4 transform rounded-full bg-white transition duration-200" 
            />
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div class="col-span-2">
          <h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Sécurité & Mot de passe</h3>
          <p class="text-xs text-amber-600 mb-4 font-medium italic">* Mot de passe actuel requis pour valider les modifications</p>
        </div>
        
        <div class="col-span-2">
          <FormInput label="Mot de passe actuel" v-model="form.currentPassword" type="password" />
        </div>
        
        <FormInput label="Nouveau mot de passe" v-model="form.newPassword" type="password" />
        <FormInput label="Confirmer le nouveau" v-model="form.confirmPassword" type="password" />
      </div>

      <div class="flex flex-col items-center pt-6">
        <button 
          type="submit" 
          :disabled="pending"
          class="w-full md:w-auto rounded-full bg-blue-600 px-12 py-3 text-white font-bold shadow-lg hover:bg-blue-700 hover:scale-105 transition-all active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
        >
          <span v-if="!pending">Sauvegarder les modifications</span>
          <span v-else class="flex items-center gap-2">
            <svg class="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Enregistrement...
          </span>
        </button>

        <Transition name="fade">
          <p v-if="successMessage" class="mt-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm border border-green-200 w-full text-center font-medium">
            ✅ {{ successMessage }}
          </p>
        </Transition>
        <Transition name="fade">
          <p v-if="errorMessage" class="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200 w-full text-center font-medium">
            ❌ {{ errorMessage }}
          </p>
        </Transition>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import FormInput from "~/components/ui/FormInput.vue"
import FormSelect from "~/components/ui/FormSelect.vue"


interface AccountForm {
  email: string
  username: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
  visible: boolean

}

const form = ref<AccountForm>({
  email: "",
  username: "",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
  visible: true,
})

const isVisible = [true, false];

const loadUserProfile = async () => {
  try {
    const user = await $fetch<AccountForm>("/api/user/profil", { method: "GET" })
    form.value = {
      ...user,

    }
  } catch (err) {
    console.error("Erreur chargement profil :", err)
  }
}

const pending = ref(false)
const successMessage = ref("")
const errorMessage = ref("")



const handleSubmit = async () => {
  errorMessage.value = ""
  successMessage.value = ""

  // 1. Validation de sécurité de base
  if (form.value.newPassword && form.value.newPassword !== form.value.confirmPassword) {
    errorMessage.value = "Les nouveaux mots de passe ne correspondent pas."
    return
  }

  // 2. Le mot de passe actuel est obligatoire pour valider les changements
  if (!form.value.currentPassword) {
    errorMessage.value = "Veuillez saisir votre mot de passe actuel pour confirmer."
    return
  }

  try {
    await $fetch("/api/user/update", {
      method: "PUT",
      body: {
        email: form.value.email,
        username: form.value.username,
        currentPassword: form.value.currentPassword, // On envoie ça au serveur
        newPassword: form.value.newPassword,
        visible: form.value.visible
      }
    })
    successMessage.value = "Profil mis à jour !"
    // Reset des champs de mot de passe après succès
    form.value.currentPassword = ""
    form.value.newPassword = ""
    form.value.confirmPassword = ""
  } catch (err: any) {
    // Si le serveur renvoie une erreur (ex: mauvais password actuel)
    errorMessage.value = err.data?.statusMessage || "Erreur lors de la mise à jour."
  }
}

onMounted(() => {
  loadUserProfile()
})
</script>