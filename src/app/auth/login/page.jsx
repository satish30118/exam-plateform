"use client"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Login() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <p style={{color:"red"}}>Signed in as {session.user.email} </p><br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn('github')}>Sign in with github</button>
      <button onClick={() => signIn('github')}>Sign in with google</button>

    </>
  )
}