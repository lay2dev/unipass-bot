import type { NextPage } from 'next'
import { Button } from '@mui/material'
import UP from 'up-core-test'
import { useRouter } from 'next/router'
import { useStore } from '../../assets/js/store'

const Page: NextPage = () => {
  const router = useRouter()
  const [state, dispatch] = useStore()
  const connect = async () => {
    try {
      await UP.connect({ email: false, evmKeys: true })
      router.replace('/')
    } catch (error) {}
  }

  return (
    <div id="page-login">
      <Button variant="contained" onClick={connect}>
        Login {state.count}
      </Button>
      <Button onClick={() => dispatch({ type: '-' })}>-</Button>
      <Button onClick={() => dispatch({ type: '+' })}>+</Button>
    </div>
  )
}
export default Page
