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
      const account = await UP.connect({ email: false, evmKeys: true })
      dispatch({
        account,
      })
      console.log('🌊', account)
      // router.replace('/')
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
