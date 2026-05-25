import { createAuthClient } from "better-auth/react"

const authConfig = {
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: "http://localhost:3000"
}

export const authClient = createAuthClient(authConfig)

export const { signIn, signUp, useSession } = authClient