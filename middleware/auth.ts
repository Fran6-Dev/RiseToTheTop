
export default defineNuxtRouteMiddleware((to, from) => {
  const { status } = useAuth()

  // "unauthenticated" → pas connecté
  if (status.value === 'unauthenticated') {
    return navigateTo('/login')
  }
})
