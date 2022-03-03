import * as React from 'react'
import type { NextPage } from 'next'
import { Button } from '@mui/material'
import UP from 'up-core-test'
import { useRouter } from 'next/router'

const Page: NextPage = () => {
  const router = useRouter()
  const connect = async () => {
    try {
      await UP.connect({ email: false, evmKeys: true })
      router.replace('/')
    } catch (error) {}
  }

  return (
    <div id="page-login">
      <Button variant="contained" onClick={connect}>
        Login
      </Button>
    </div>
  )
}
export default Page
