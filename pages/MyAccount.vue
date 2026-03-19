<template>
 <form @submit.prevent="handleSubmit">
    <FormInput label="Email" v-model="form.email"/>
    <FormInput label="Username" v-model="form.username"/>
    <FormInput label="Password" v-model="form.password"/>
    <FormSelect label="Visible" :options="isVisible" v-model="form.visible"/>
    
 </form>
</template>

<script lang="ts" setup>
import FormInput from "~/components/ui/FormInput.vue"
import FormSelect from "~/components/ui/FormSelect.vue"


interface AccountForm {
    email: string
    username: string
    password: string
    visible: boolean | null

}

const form = ref<AccountForm>({
    email: "",
    username: "",
    password: "",
    visible: null,
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



onMounted(() => {
  loadUserProfile()
})

</script>