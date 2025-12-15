<template>
  <main class="min-h-screen bg-slate-100 flex items-center justify-center px-4">
    <div class="text-center max-w-md">
      <p class="text-xs uppercase tracking-[0.25em] text-slate-400 mb-2">
        RiseToTheTop
      </p>

      <p class="text-6xl font-extrabold text-blue-600">404</p>

      <h1 class="mt-4 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
        Oups, cette page n'existe pas.
      </h1>

      <p class="mt-3 text-sm text-slate-600">
        On dirait que tu as tenté un tir depuis l’extérieur du terrain.  
        La page que tu cherches n’est plus là, ou n’a jamais existé.
      </p>

      <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <NuxtLink
          to="/"
          class="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition"
        >
          Revenir à l'accueil
        </NuxtLink>

        <NuxtLink
          to="/ContactUs"
          class="text-sm font-medium text-slate-700 hover:text-slate-900"
        >
          Contacter le support
          <span aria-hidden="true">→</span>
        </NuxtLink>
      </div>

      <p class="mt-6 text-[11px] text-slate-400">
        Conseil : vérifie l'URL ou utilise le menu pour trouver ce que tu cherches.
      </p>
    </div>
  </main>
</template>
