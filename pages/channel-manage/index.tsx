import type { NextPage } from 'next'
import * as React from 'react'
import { SeaSwitch, SeaRole, SeaIcon, SeaChannel } from '../../components'
import { Box, Button, IconButton, MenuItem, Select, TextField, Paper } from '@mui/material'

const Page: NextPage = () => {
  const bindSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('🌊', event.target.checked)
  }
  return (
    <div id="page-channel-manage">
      <div className="sea-border">
        <div className="info">
          <h3>Channel</h3>
          <SeaChannel name="UniPass" />
          <SeaSwitch className="switch" onChange={bindSwitch} defaultChecked={true} />
          <IconButton sx={{ marginLeft: '8px' }}>
            <SeaIcon icon="ic:round-keyboard-arrow-up" />
          </IconButton>
        </div>
      </div>
      <div className="tip">
        <div className="one">
          <SeaIcon icon="icon-park-outline:message-one"></SeaIcon>
          <SeaRole color="#c4505e" text="UP Lv1" />
          <SeaRole color="#e9c0a0" text="UP Lv2" />
        </div>
        <div className="one">
          <SeaIcon icon="icon-park-outline:message-privacy"></SeaIcon>
          <SeaRole color="#4fab9f" text="UP Lv1" />
          <SeaRole color="#3b7669" text="UP Lv2" />
        </div>
      </div>
    </div>
  )
}

export default Page
