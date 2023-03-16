import React from 'react'
import { useRouter } from 'next/router'

function post() {
  const router = useRouter()
  const { index } = router.query
  
  return (
    <div>heheh</div>
  )
}

export default post;