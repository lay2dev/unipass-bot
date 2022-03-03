import type { NextPage } from 'next'
import { Button } from '@mui/material'
import UP, { UPAuthMessage, UPAuthResponse } from 'up-core-test'
import { useRouter } from 'next/router'
import { useStore } from '../../assets/js/store'
import api from '../../assets/js/api'

const Page: NextPage = () => {
  const router = useRouter()
  const [state, dispatch] = useStore()
  const connect = async () => {
    try {
      const account = await UP.connect({ email: false, evmKeys: true })
      dispatch({
        account,
      })
      const timestamp = String(Date.now())
      const ret = await UP.authorize(new UPAuthMessage('PLAIN_MSG', account.username, timestamp))
      const { sig, pubkey, keyType } = ret
      const res = await api.post('/account/login', {
        uniPassId: 'sea792',
        key: pubkey,
        sig,
        raw: timestamp,
      })
      console.log('🌊', res)
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
