'use client' 

import { signOut } from 'next-auth/react'

export async function handleSignOut() {
  await signOut({ redirectTo: "/" })
}