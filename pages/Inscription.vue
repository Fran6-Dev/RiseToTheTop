<template class="">
  <!-- <div class="min-h-screen flex items-center justify-center"> -->
    <div class="max-w-md mx-auto flex flex-col justify-center my-48">
      <h2 class="text-center text-2xl mb-2 text-orange-600">Welcome !</h2>
      <p class="mb-2 text-xs text-center">Inscription !</p>
      <form action="">
        <div class="mb-2">
          <label for="email">Nom</label>
          <input
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            placeholder="James"
          >
        </div>
        <div class="mb-2">
          <label for="email">Prénom</label>
          <input
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            placeholder="Lebron"
          >
        </div>
        <div class="mb-2">
          <label for="email">Email</label>
          <input
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            placeholder="johndoe@exemple.com"
          >
        </div>
        <div class="mb-2">
          <label for="password">Mot de passe</label>
          <input
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="password"
            placeholder="mot de passe"
          >
        </div>
        <div class="mb-2">
          <label for="password">Confirmer mot de passe</label>
          <input
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="password"
            placeholder="mot de passe"
          >
        </div>
        <button
          class="block w-full rounded-md bg-orange-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          type="submit"
        >S'inscrire</button>
      </form>
    </div>
  <!-- </div> -->
</template>

<script lang="ts" setup>
</script>

<style></style>
