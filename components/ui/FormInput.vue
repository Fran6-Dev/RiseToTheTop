<template>
  <div>
    <label class="block mb-1 font-medium text-slate-700">{{ label }}</label>

    <input
      :type="type"
      v-model="internalValue"
      :placeholder="placeholder"
      class="w-full rounded-2xl border border-slate-300 p-3 focus:ring-2 focus:ring-blue-600"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: String,
  modelValue: [String, Number],
  placeholder: String,
  type: { type: String, default: "text" }
})

const emit = defineEmits(["update:modelValue"])

const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val)
})
</script>
