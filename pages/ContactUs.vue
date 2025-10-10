<template>
    <div class="min-h-screen flex items-center justify-center">
  <div class="flex flex-col justify-center items-center my-11">
    <h2 class="text-2xl my-4">Contactez-nous</h2>
    <p class="mb-4">Besoin d'aide ou besoin de communiquer directement avec nous ?</p>
    <form
      action="#"
      method="POST"
    >
      <div>
        <div>
          <label
            class="block text-sm font-semibold leading-6"
            for="name"
          >Nom</label>
          <div>
            <input
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              placeholder="John Doe"
            >
          </div>
        </div>
      </div>
      <div>
        <div>
          <label
            class="block text-sm font-semibold leading-6"
            for="email"
          >Email</label>
          <div>
            <input
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="email"
              placeholder="johndoe@exemple.com"
            >
          </div>
        </div>
      </div>
      <div>
        <div>
          <label
            class="block text-sm font-semibold leading-6"
            for="message"
          >Message</label>
          <div>
            <textarea
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Entrez votre message ici..."
            ></textarea>
          </div>
        </div>
      </div>
      <div class="my-10">
        <button
          type="submit"
          class="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >Envoyer</button>
      </div>
    </form>
  </div>
    </div>
</template>

<script
  lang="ts"
  setup
>

</script>

<style></style>