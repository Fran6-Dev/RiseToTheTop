import { User } from "~/server/models/User"

export default defineEventHandler(async (event) => {
  const id = event.context.params!.id
  const body = await readBody(event)

  await User.findByIdAndUpdate(id, {
    isDeleted: body.isDeleted
  })

  return { success: true }
})
