import type { NextPage } from 'next'
import { Button } from '@mui/material'
import UP, { UPAuthMessage } from 'up-core-test'
import { useRouter } from 'next/router'
import { useStore } from '../../assets/js/store'
import api from '../../assets/js/api'
import { message } from 'antd'

const Page: NextPage = () => {
  const router = useRouter()
  const [state, dispatch] = useStore()
  const connect = async () => {
    try {
      const account = await UP.connect({ email: false, evmKeys: true })
      const timestamp = String(Date.now())
      const ret = await UP.authorize(new UPAuthMessage('PLAIN_MSG', account.username, timestamp))
      const { sig, pubkey } = ret
      const res = await api.post('/account/login', {
        uniPassId: account.username,
        key: pubkey,
        sig,
        raw: timestamp,
      })
      const { username, email, evmKeys } = account
      const { discordUuid, accessToken, refreshToken } = res.data
      if (accessToken) {
        api.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
        const res = await api.get('/guilds')
        const servers = res.data
        const account = {
          servers,
          timestamp,
          accessToken,
          refreshToken,
          discordUuid,
          username,
          email,
          evmKeys,
        }
        dispatch({ account })
        window.localStorage.setItem('UP-BOT', JSON.stringify(account))
        router.replace('/')
      } else {
        UP.disconnect()
      }
    } catch (error) {
      message.error('This UniPass ID has not verified the Discord account, please verify it first.')
      UP.disconnect()
    }
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
