// export default defineEventHandler(async (event) => {
//   const user = await getUserFromEvent(event) // selon ton système

//   if (!user || user.accountRole !== 'admin') {
//     throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
//   }

//   // logique admin ici
// })
