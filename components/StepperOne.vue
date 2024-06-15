<template>
  <div>
    <h2>Étape 1</h2>
    <div class="mb-2">
      <label for="email">Nom</label>
      <input
        class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type="text"
        placeholder="James"
        v-model="form.name"
      >
    </div>
    <div class="mb-2">
      <label for="email">Prénom</label>
      <input
        class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type="text"
        placeholder="Lebron"
        v-model="form.forname"
      >
    </div>
    <div class="mb-2">
      <label for="email">Email</label>
      <input
        class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type="text"
        placeholder="johndoe@exemple.com"
        v-model="form.email"
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
    <div class="mb-2">
      <label for="password">Confirmer mot de passe</label>
      <input
        class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type="password"
        placeholder="mot de passe"
        v-model="form.password"
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue';

interface FormData {
  name: string;
  forname: string;
  email: string;
  password: string;
}

const form = inject<FormData>('form')!;

</script>

<style></style>