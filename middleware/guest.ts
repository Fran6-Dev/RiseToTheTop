// middleware/guest.ts
export default defineNuxtRouteMiddleware((to) => {
    const { status } = useAuth()
  
    // Si on est déjà connecté et qu'on essaie d'aller sur Login/Register
    if (status.value === 'authenticated') {
      if (to.path === '/') return // Déjà à destination, on arrête
      return navigateTo('/')
    }
  })