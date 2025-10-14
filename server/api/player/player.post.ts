import { User } from '~/server/models/User';

export default defineEventHandler(async(event) => {
    const body = await readBody(event);
})