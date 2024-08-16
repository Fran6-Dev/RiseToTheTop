<template class="">
  <div class="min-h-screen flex items-center justify-center">
    <div class="max-w-md mx-auto flex flex-col justify-center">
      <h2 class="text-center text-2xl mb-2 text-orange-600">Welcome !</h2>
      <p class="mb-2 text-xs text-center">Entrez vos identifiants !</p>
      <form @submit.prevent="handleLogin">
        <div class="mb-2">
          <label for="username">Nom d'utilisateur</label>
          <input
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            placeholder="lebron"
            v-model="form.username"
          >
        </div>
        <div class="mb-2">
          <label for="password">Mot de passe</label>
          <input
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="password"
            placeholder="mot de passe"
            v-model="form.password"
          >
        </div>
        <button
          class="block w-full rounded-md bg-orange-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          type="submit"
        >Se connecter</button>
      </form>
      <p class="mt-3">Pas encore de compte ? <NuxtLink
          to="/Inscription"
          class="text-orange-600 hover:text-blue-500"
        >S'inscrire ici</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>

definePageMeta({
  middleware: 'guest'
})

const form = ref({
  username: '',
  password: '',
})

const { signIn } = useAuth();


async function handleLogin() {
  try {
    await signIn("credentials", form.value);
    useRouter().push({
      name:"index"
    })
  } catch (e) {}
}

</script>

<style></style>

