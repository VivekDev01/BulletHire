'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function OAuthComplete() {
  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')

    if (token) {
      localStorage.setItem('token', token)
      router.push('/home')
    } else {
      alert('Login failed')
    }
  }, [router])

  return <div>Logging you in...</div>
}
