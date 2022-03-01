import type { NextPage } from 'next'
import * as React from 'react'
import { SeaSwitch, SeaRole, SeaIcon, SeaChannel } from '../../components'
import { Box, Button, IconButton, MenuItem, Select, TextField, Paper } from '@mui/material'

const Page: NextPage = () => {
  const bindSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('🌊', event.target.checked)
  }
  return (
    <div className="page-channel-manage">
      <div className="sea-border">
        <div className="roleInfo">
          <h3>Channel</h3>
          <SeaChannel name="UniPass" />
          <SeaSwitch className="switch" onChange={bindSwitch} defaultChecked={true} />
          <IconButton sx={{ marginLeft: '8px' }}>
            <SeaIcon icon="ic:round-keyboard-arrow-up" />
          </IconButton>
        </div>
      </div>
      <div className="roleTip">
        <div className="roleTipOne">
          <SeaIcon sx={{ fontSize: '32px' }} icon="icon-park-outline:message-one"></SeaIcon>
          <SeaRole sx={{ marginLeft: '20px' }} color="#c4505e" text="UP Lv1" />
          <SeaRole sx={{ marginLeft: '20px' }} color="#e9c0a0" text="UP Lv2" />
        </div>
        <div className="roleTipOne">
          <SeaIcon sx={{ fontSize: '32px' }} icon="icon-park-outline:message-privacy"></SeaIcon>
          <SeaRole sx={{ marginLeft: '20px' }} color="#4fab9f" text="UP Lv1" />
          <SeaRole sx={{ marginLeft: '20px' }} color="#3b7669" text="UP Lv2" />
        </div>
      </div>
    </div>
  )
}

export default Page
