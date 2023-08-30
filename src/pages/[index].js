import React from 'react'
import { useRouter } from 'next/router'

function post() {
  const router = useRouter()
  const { index } = router.query
  
  return (
    <div>page don't exist</div>
  )
}

export default post;