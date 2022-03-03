import type { NextPage } from 'next'
import * as React from 'react'
import { SeaSwitch, SeaRole, SeaIcon, SeaChannel } from '../../components'
import { Button, IconButton, MenuItem, Select, SelectChangeEvent, Paper } from '@mui/material'

const Page: NextPage = () => {
  const bindSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('🌊', event.target.checked)
  }

  // channel select
  const [channel, setChannel] = React.useState('UniPass')
  const bindChannel = (event: SelectChangeEvent) => {
    const v = event.target.value
    setChannel(v)
  }
  const [viewChannel, setViewChannel] = React.useState([
    {
      color: '#c4505e',
      lv: 'UP Lv4',
    },
    {
      color: '#e9c0a0',
      lv: 'UP Lv3',
    },
    {
      color: '#4fab9f',
      lv: 'UP Lv1',
    },
    {
      color: '#3b7669',
      lv: 'UP Lv2',
    },
  ])
  return (
    <div id="page-channel-manage">
      <div className="sea-box-one">
        <div className="info">
          <h3>Channel</h3>
          <SeaChannel name="UniPass" />
          <SeaSwitch className="switch" onChange={bindSwitch} defaultChecked={true} />
          <IconButton sx={{ marginLeft: '8px' }}>
            <SeaIcon icon="ic:round-keyboard-arrow-up" />
          </IconButton>
        </div>
        <div className="tip-box">
          <div className="one">
            <SeaIcon icon="icon-park-outline:message-one"></SeaIcon>
            <SeaRole color="#c4505e" text="UP Lv4" />
            <SeaRole color="#e9c0a0" text="UP Lv3" />
          </div>
          <div className="one">
            <SeaIcon icon="icon-park-outline:message-privacy"></SeaIcon>
            <SeaRole color="#4fab9f" text="UP Lv1" />
            <SeaRole color="#3b7669" text="UP Lv2" />
          </div>
        </div>
        <h3>Set Channel</h3>
        <Select className="select" size="small" value={channel} onChange={bindChannel}>
          <MenuItem value="UniPass"># UniPass</MenuItem>
          <MenuItem value="Aven"># Aven</MenuItem>
        </Select>
        <h3>Message manage</h3>
        <Paper className="sea-paper" elevation={12}>
          <div className="view-channel">
            <h4>View channel</h4>
            <h5>Allows members to view this channel.</h5>
            <div className="sea-operation-box">
              {viewChannel.map((e, i) => {
                return <SeaRole key={i} color={e.color} text={e.lv} />
              })}
              <div className="operation">
                <IconButton>
                  <SeaIcon icon="fluent:add-circle-16-regular"></SeaIcon>
                </IconButton>
                <IconButton>
                  <SeaIcon icon="fluent:subtract-circle-16-regular"></SeaIcon>
                </IconButton>
              </div>
            </div>
          </div>
        </Paper>
        <Paper className="sea-paper" elevation={12}>
          <div className="send-message">
            <h4>Send message</h4>
            <h5>Allow those members to publish their own message.</h5>
            <div className="sea-operation-box">
              <SeaRole color="#4fab9f" text="UP Lv1" />
              <SeaRole color="#3b7669" text="UP Lv2" />
              <div className="operation">
                <IconButton>
                  <SeaIcon icon="fluent:add-circle-16-regular"></SeaIcon>
                </IconButton>
                <IconButton>
                  <SeaIcon icon="fluent:subtract-circle-16-regular"></SeaIcon>
                </IconButton>
              </div>
            </div>
          </div>
        </Paper>
        <div className="save">
          <Button className="submit" variant="contained" color="secondary">
            Save
          </Button>
        </div>
      </div>
      <div className="sea-box-one">
        <div className="info">
          <h3>Channel</h3>
          <SeaChannel name="UniPass-VIP" />
          <SeaSwitch className="switch" onChange={bindSwitch} defaultChecked={true} />
          <IconButton sx={{ marginLeft: '8px' }}>
            <SeaIcon icon="ic:round-keyboard-arrow-up" sx={{ transform: 'rotate(180deg)' }} />
          </IconButton>
        </div>
        <div className="tip-box">
          <div className="one">
            <SeaIcon icon="icon-park-outline:message-one"></SeaIcon>
            <SeaRole color="#c4505e" text="UP Lv4" />
            <SeaRole color="#e9c0a0" text="UP Lv3" />
          </div>
          <div className="one">
            <SeaIcon icon="icon-park-outline:message-privacy"></SeaIcon>
            <SeaRole color="#4fab9f" text="UP Lv1" />
            <SeaRole color="#3b7669" text="UP Lv2" />
          </div>
        </div>
      </div>
      <div className="sea-box-one">
        <div className="info">
          <h3>Channel</h3>
          <SeaChannel name="UniPass-VIP2" />
          <SeaSwitch className="switch" onChange={bindSwitch} defaultChecked={false} />
          <IconButton sx={{ marginLeft: '8px' }}>
            <SeaIcon icon="ic:round-keyboard-arrow-up" sx={{ transform: 'rotate(180deg)' }} />
          </IconButton>
        </div>
        <div className="tip-box">
          <div className="one">
            <SeaIcon icon="icon-park-outline:message-one"></SeaIcon>
            <SeaRole color="#c4505e" text="UP Lv4" />
            <SeaRole color="#e9c0a0" text="UP Lv3" />
          </div>
          <div className="one">
            <SeaIcon icon="icon-park-outline:message-privacy"></SeaIcon>
            <SeaRole color="#4fab9f" text="UP Lv1" />
            <SeaRole color="#3b7669" text="UP Lv2" />
          </div>
        </div>
      </div>
      <div className="sea-new-box">
        <Button>+ Add a new channel manage</Button>
      </div>
    </div>
  )
}

export default Page
