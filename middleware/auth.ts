// middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
  const { status } = useAuth()

  // 1. Autoriser l'accès à la page de login même si on n'est pas authentifié
  if (to.path === '/login') {
    return
  }

  // 2. Si on n'est pas connecté et qu'on essaie d'aller ailleurs
  if (status.value === 'unauthenticated') {
    return navigateTo('/login')
  }
})