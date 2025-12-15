<template>
  <div class="min-h-screen bg-slate-100 flex items-center">
    <div class="max-w-4xl mx-auto px-4 py-10 w-full">
      <div class="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden grid md:grid-cols-5">
        <!-- Bloc texte / info -->
        <div class="md:col-span-2 bg-slate-950 text-slate-100 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <p class="text-xs uppercase tracking-[0.25em] text-slate-400 mb-2">
              Contact
            </p>
            <h2 class="text-2xl font-semibold mb-3">
              Contactez-nous
            </h2>
            <p class="text-sm text-slate-300">
              Besoin d'aide, d'informations ou envie d'échanger directement avec nous ?
              Écris-nous, on te répond au plus vite.
            </p>
          </div>

          <div class="mt-6 text-xs text-slate-400 space-y-1">
            <p>Email : support@risetothetop.app</p>
            <p>
              Réponse moyenne : sous 48h
            </p>
          </div>
        </div>

        <!-- Formulaire -->
        <div class="md:col-span-3 p-6 md:p-8">
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label
                for="name"
                class="block text-sm font-medium text-slate-700 mb-1"
              >
                Nom
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                placeholder="John Doe"
                class="block w-full rounded-2xl border border-slate-300 px-3.5 py-2.5 text-slate-900 shadow-sm placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                required
              >
            </div>

            <div>
              <label
                for="email"
                class="block text-sm font-medium text-slate-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="johndoe@example.com"
                class="block w-full rounded-2xl border border-slate-300 px-3.5 py-2.5 text-slate-900 shadow-sm placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                required
              >
            </div>

            <div>
              <label
                for="message"
                class="block text-sm font-medium text-slate-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                placeholder="Entre ton message ici..."
                class="block w-full rounded-2xl border border-slate-300 px-3.5 py-2.5 text-slate-900 shadow-sm placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                required
              ></textarea>
            </div>

            <div class="pt-4">
              <button
                type="submit"
                class="block w-full rounded-full bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
                :disabled="isSubmitting"
              >
                <span v-if="!isSubmitting">Envoyer</span>
                <span v-else>Envoi en cours...</span>
              </button>

              <p
                v-if="successMessage"
                class="text-xs text-emerald-600 mt-3"
              >
                {{ successMessage }}
              </p>
              <p
                v-if="errorMessage"
                class="text-xs text-red-600 mt-3"
              >
                {{ errorMessage }}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['auth']
})

const form = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleSubmit = async () => {
  isSubmitting.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    // Ici tu peux brancher ton API plus tard
    // console.log('Formulaire contact :', form.value)
    successMessage.value = 'Merci, ton message a bien été envoyé.'
    form.value = { name: '', email: '', message: '' }
  } catch (e) {
    errorMessage.value = 'Une erreur est survenue. Merci de réessayer plus tard.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style></style>
