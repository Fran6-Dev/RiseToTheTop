<template>
  <div>
    <label class="block mb-1 font-medium text-slate-700">{{ label }}</label>

    <select
      v-model="internalValue"
      class="w-full rounded-2xl border border-slate-300 p-3 focus:ring-2 focus:ring-blue-600"
    >
      <option value="">-- Choisir --</option>
      <option v-for="opt in options" :key="opt" :value="opt">{{ opt }}</option>
    </select>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: String,
  modelValue: String,
  options: Array
})

const emit = defineEmits(["update:modelValue"])

// computed getter + setter
const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val)
})
</script>
