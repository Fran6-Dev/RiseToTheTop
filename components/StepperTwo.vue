<template>
  <div>
    <h2>Étape 2</h2>
    <div class="mb-2">
      <label for="size">Taille en cm</label>
      <input
        class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type="number"
        minlength="2"
        maxlength="3"
        placeholder="200"
        v-model="form.size"
      >
    </div>
    <div class="mb-2">
      <label for="size">Poste de jeu</label>
      <select
        v-model="form.selectedItem"
        id=""
      >
      <option v-for="item in items" key="item" value="item"> {{ item }}</option>
      </select>
    </div>
    <div class="mb-2">
      <label for="size">Club actuel</label>
      <input
        class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type="number"
        minlength="2"
        maxlength="3"
        placeholder="Lakers"
        v-model="form.club"
      >
    </div>
    <div class="mb-2">
      <label for="size">Niveau de compétition</label>
      <input
        class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type="number"
        minlength="2"
        maxlength="3"
        placeholder="NBA"
        v-model="form.niveau"
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue';

interface FormData {
  size: number;
  selectedItem: number;
  club: string;
  niveau: string;
}

const items: number[] = [1, 2, 3, 4, 5];

const form = inject<FormData>('form')!;
</script>
