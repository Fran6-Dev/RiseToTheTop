// middleware/admin.ts
export default defineNuxtRouteMiddleware(() => {
  const { status, data } = useAuth()

  if (status.value !== 'authenticated') {
    return navigateTo('/Login')
  }

  const accountRole = data.value?.user?.accountRole
  // console.log(accountRole);

  if (accountRole !== 'admin') {
    return navigateTo('/') // ou une page 403
  }
})
