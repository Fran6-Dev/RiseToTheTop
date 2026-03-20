// middleware/admin.ts
export default defineNuxtRouteMiddleware((to) => {
  const { status, data } = useAuth()

  // 1. Pas connecté -> Login
  if (status.value !== 'authenticated') {
    return navigateTo('/login')
  }

  // 2. Pas admin -> Accueil (mais seulement si on n'y est pas déjà !)
  const accountRole = (data.value?.user as any)?.accountRole
  if (accountRole !== 'admin' && to.path !== '/') {
    return navigateTo('/')
  }
})