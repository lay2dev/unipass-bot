import type { NextPage } from 'next'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useStore } from '../../assets/js/store'
import { SeaSwitch, SeaRole, SeaIcon, SeaChannel } from '../../components'
import {
  Button,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import api from '../../assets/js/api'
import { ChannelRule, Channel, Role } from '../../assets/js/role.dto'

const Page: NextPage = () => {
  const [state] = useStore()
  const [channels, setChannels] = useState([] as Channel[])
  const [roles, setRoles] = useState([] as Role[])
  const [rules, setRules] = useState([] as ChannelRule[])
  useEffect(() => {
    api.get('/roles/' + state.server).then((res) => {
      const roles = res.data
      if (roles) {
        console.log('roles', roles)
        setRoles(roles)
      }
    })
    api.get('/channels/' + state.server).then((res) => {
      const channels = res.data
      if (channels) {
        console.log('channels', channels)
        setChannels(res.data)
      }
    })
    api.get('/channels/' + state.server + '/rule').then((res) => {
      const rules = res.data
      if (rules) {
        console.log('rules', rules)
        setRules(res.data)
      }
    })
  }, [state.server])

  const bindSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('🌊', event.target.checked)
  }
  const bindRuleAdd = () => {
    const channel = channels[0]
    const rule = {
      channel,
      ruleId: 0,
      open: true,
      viewChannelList: [],
      sendMessageList: [],
    } as ChannelRule
    rules.push(rule)
    setRules([...rules])
  }
  // channel select
  const bindChannel = (event: SelectChangeEvent, i: number) => {
    const v = event.target.value
    const channel = channels.find((e) => e.id === v)
    if (channel) {
      rules[i].channel = channel
      setRules([...rules])
    }
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
  const bindRuleDel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, i: number) => {
    event.stopPropagation()
  }
  return (
    <div id="page-channel-manage">
      {rules.map((e, i) => (
        <Accordion key={i} className="sea-box-one">
          <AccordionSummary
            expandIcon={<SeaIcon sx={{ fontSize: '32px' }} icon="ic:round-expand-more" />}
          >
            <div className="info">
              <div className="title">
                <div className="sea-h3">Channel</div>
                <SeaChannel name={e.channel.name} />
                <IconButton
                  className="delete"
                  color="error"
                  onClick={(event) => bindRuleDel(event, i)}
                >
                  <SeaIcon icon="fluent:delete-24-filled" />
                </IconButton>
                <SeaSwitch
                  className="switch"
                  onClick={(event) => {
                    event.stopPropagation()
                  }}
                  onChange={bindSwitch}
                  defaultChecked={true}
                />
              </div>
              <div className="tip-box">
                <div className="one">
                  <Image src="/images/view.svg" width={32} height={32} alt="view" />
                  <SeaRole color="#c4505e" text="UP Lv4" />
                  <SeaRole color="#e9c0a0" text="UP Lv3" />
                </div>
                <div className="one">
                  <Image src="/images/no-words.svg" width={32} height={32} alt="no-words" />
                  <SeaRole color="#4fab9f" text="UP Lv1" />
                  <SeaRole color="#3b7669" text="UP Lv2" />
                </div>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="sea-h3">Select Channel</div>
            <Select
              className="select"
              size="small"
              value={e.channel.id}
              onChange={(event) => bindChannel(event, i)}
            >
              {channels.map((channel) => (
                <MenuItem key={channel.id} value={channel.id}>
                  {channel.name}
                </MenuItem>
              ))}
            </Select>
            <div className="sea-h3">Message manage</div>
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
          </AccordionDetails>
        </Accordion>
      ))}
      <div className="sea-new-box">
        <Button onClick={bindRuleAdd}>+ Add a new rule</Button>
      </div>
    </div>
  )
}

export default Page
