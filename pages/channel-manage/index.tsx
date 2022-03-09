import type { NextPage } from 'next'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useStore } from '../../assets/js/store'
import { isEqual, cloneDeep } from 'lodash'
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
} from '@mui/material'

import api from '../../assets/js/api'
import { ChannelRule, Channel, Role } from '../../assets/js/role.dto'
import { message } from 'antd'
import UP, { UPAuthMessage } from 'up-core-test'

const Page: NextPage = () => {
  const [state] = useStore()
  const [channels, setChannels] = useState([] as Channel[])
  const [roles, setRoles] = useState([] as Role[])
  const [rules, setRules] = useState([] as ChannelRule[])
  const [rulesOld, setRulesOld] = useState([] as ChannelRule[])
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
        setRulesOld(cloneDeep(rules))
      }
    })
  }, [state.server])

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
  const [dialogDel, setDialogDel] = React.useState(false)
  const [dialogType, setDialogType] = React.useState('')
  const [dialogIndex, setDialogIndex] = React.useState(-1)
  const [dialogList, setDialogList] = React.useState(false)
  const [dialogRoles, setDialogRoles] = React.useState([] as Role[])
  const bindRole = {
    viewAdd(roles: Role[], i: number) {
      setDialogType('viewAdd')
      setDialogIndex(i)
      setDialogRoles(
        roles.filter((e) => {
          for (const role of rules[i].viewChannelList) {
            if (role.id === e.id) {
              return false
            }
          }
          return true
        }),
      )
      setDialogList(true)
    },
    viewDel(roles: Role[], i: number) {
      setDialogType('viewDel')
      setDialogIndex(i)
      setDialogRoles(roles)
      setDialogList(true)
    },
    sendAdd(roles: Role[], i: number) {
      setDialogType('sendAdd')
      setDialogIndex(i)
      setDialogRoles(roles)
      setDialogList(true)
    },
    sendDel(roles: Role[], i: number) {
      setDialogType('sendDel')
      setDialogIndex(i)
      setDialogRoles(roles)
      setDialogList(true)
    },
    select(role: Role, index: number) {
      const i = dialogIndex
      if (!rules[i]) {
        return
      }
      if (dialogType === 'viewAdd') {
        for (const e of rules[i].viewChannelList) {
          if (e.id === role.id) {
            setDialogList(false)
            message.info('Added')
            return
          }
        }
        rules[i].viewChannelList.push(role)
        setRules([...rules])
        // remove added
        dialogRoles.splice(index, 1)
        setDialogRoles(dialogRoles)
        if (dialogRoles.length === 0) {
          setDialogList(false)
        }
      } else if (dialogType === 'viewDel') {
        const index = rules[i].viewChannelList.findIndex((e) => e.id === role.id)
        if (index !== -1) {
          rules[i].viewChannelList.splice(index, 1)
          setRules([...rules])
          if (rules[i].viewChannelList.length === 0) {
            setDialogList(false)
          }
        }
      } else if (dialogType === 'sendAdd') {
        for (const e of rules[i].sendMessageList) {
          if (e.id === role.id) {
            setDialogList(false)
            message.info('Added')
            return
          }
        }
        rules[i].sendMessageList.push(role)
        setRules([...rules])
      } else if (dialogType === 'sendDel') {
        const index = rules[i].sendMessageList.findIndex((e) => e.id === role.id)
        if (index !== -1) {
          rules[i].sendMessageList.splice(index, 1)
          setRules([...rules])
          if (rules[i].sendMessageList.length === 0) {
            setDialogList(false)
          }
        }
      }
    },
  }
  const formatColor = (num: number) => {
    num >>>= 0
    const r = (num & 0xff0000) >>> 16
    const g = (num & 0xff00) >>> 8
    const b = num & 0xff
    // a = ((num & 0xff000000) >>> 24) / 255
    const color = `rgb(${[r, g, b].join(',')})`
    return color
  }
  const initNoWords = (sendList: Role[], viewList: Role[]) => {
    const list = []
    for (const role of viewList) {
      const index = sendList.findIndex((e) => e.id === role.id)
      if (index === -1) {
        list.push(role)
      }
    }
    return list
  }
  const bindRuleDel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, i: number) => {
    event.stopPropagation()
    setDialogIndex(i)
    setDialogDel(true)
  }
  const bindConfirmDel = async () => {
    setDialogDel(false)
    const i = dialogIndex
    const rule = rules[i]
    if (!rule.ruleId) {
      rules.splice(i, 1)
      setRules([...rules])
      return
    }
    const res = await api({
      url: '/channels/' + state.server + '/rule',
      method: 'delete',
      data: {
        id: rule.ruleId,
      },
    })
    if (res.code === 2000) {
      rules.splice(i, 1)
      setRules([...rules])
      message.success('Delete successfully!')
    } else {
      message.error('Delete failed!')
    }
  }
  const bindSave = async (i: number) => {
    const rule = rules[i]
    // sign
    const account = state.account
    const server = account.servers.find((e: { id: string }) => e.id === state.server)
    const timestamp = String(Date.now())
    const ret = await UP.authorize(new UPAuthMessage('PLAIN_MSG', account.username, timestamp))
    const { sig, pubkey } = ret
    const res = await api.post('/channels/rule', {
      guildId: server.id,
      id: rule.ruleId,
      channelId: rule.channel.id,
      viewChannel: rule.viewChannelList,
      sendMessage: rule.sendMessageList,
      open: rule.open,
      key: pubkey,
      sig,
      raw: timestamp,
    })
    if (res.code === 2000) {
      rules[i] = res.data.ruleId
      message.success('Save Saved successfully!')
    } else if (res.code === 5040) {
      message.error(res.message)
    } else {
      message.error('Save failed!')
    }
  }
  const initDisabled = (i: number) => {
    const a = rules[i]
    const b = rulesOld[i]
    return isEqual(a, b)
  }
  const [dialogOn, setDialogOn] = React.useState(false)
  const [dialogOff, setDialogOff] = React.useState(false)
  const bindSwitch = (event: React.ChangeEvent<HTMLInputElement>, i: number) => {
    setDialogIndex(i)
    const open = event.target.checked
    if (open) {
      setDialogOn(true)
    } else {
      setDialogOff(true)
    }
  }
  const bindConfirmOn = () => {
    setDialogOn(false)
    const i = dialogIndex
    rules[i].open = true
    setRules([...rules])
    bindSave(i)
  }
  const bindConfirmOff = () => {
    setDialogOff(false)
    const i = dialogIndex
    rules[i].open = false
    setRules([...rules])
    bindSave(i)
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
                  onClick={(event) => {
                    event.stopPropagation()
                  }}
                  className="switch"
                  onChange={(event) => bindSwitch(event, i)}
                  checked={e.open}
                />
              </div>
              <div className="tip-box">
                <div className="one">
                  <Image src="/images/view.svg" width={32} height={32} alt="view" />
                  {e.viewChannelList.map((role) => (
                    <SeaRole key={role.id} color={formatColor(role.color)} text={role.name} />
                  ))}
                </div>
                <div className="one">
                  <Image src="/images/no-words.svg" width={32} height={32} alt="no-words" />
                  {initNoWords(e.sendMessageList, e.viewChannelList).map((role) => (
                    <SeaRole key={role.id} color={formatColor(role.color)} text={role.name} />
                  ))}
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
                  {e.viewChannelList.map((role) => {
                    return (
                      <SeaRole key={role.id} color={formatColor(role.color)} text={role.name} />
                    )
                  })}
                  <div className="operation">
                    <IconButton onClick={() => bindRole.viewAdd(roles, i)}>
                      <SeaIcon icon="fluent:add-circle-16-regular"></SeaIcon>
                    </IconButton>
                    {!!e.viewChannelList.length && (
                      <IconButton onClick={() => bindRole.viewDel(e.viewChannelList, i)}>
                        <SeaIcon icon="fluent:subtract-circle-16-regular"></SeaIcon>
                      </IconButton>
                    )}
                  </div>
                </div>
              </div>
            </Paper>
            <Paper className="sea-paper" elevation={12}>
              <div className="send-message">
                <h4>Send message</h4>
                <h5>Allow those members to publish their own message.</h5>
                <div className="sea-operation-box">
                  {e.sendMessageList.map((role) => {
                    return (
                      <SeaRole key={role.id} color={formatColor(role.color)} text={role.name} />
                    )
                  })}
                  <div className="operation">
                    {!!e.viewChannelList.length && (
                      <IconButton onClick={() => bindRole.sendAdd(e.viewChannelList, i)}>
                        <SeaIcon icon="fluent:add-circle-16-regular"></SeaIcon>
                      </IconButton>
                    )}
                    {!!e.sendMessageList.length && (
                      <IconButton onClick={() => bindRole.sendDel(e.sendMessageList, i)}>
                        <SeaIcon icon="fluent:subtract-circle-16-regular"></SeaIcon>
                      </IconButton>
                    )}
                  </div>
                </div>
              </div>
            </Paper>

            <div className="save">
              <Button
                disabled={initDisabled(i)}
                onClick={() => bindSave(i)}
                className="submit"
                variant="contained"
                color="secondary"
              >
                Save
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
      <div className="sea-new-box">
        <Button onClick={bindRuleAdd}>+ Add a new rule</Button>
      </div>
      <Dialog open={dialogList} onClose={() => setDialogList(false)}>
        <DialogContent>
          <List>
            {dialogRoles.map((role: Role, i) => (
              <ListItem key={role.id} disablePadding onClick={() => bindRole.select(role, i)}>
                <ListItemButton>
                  <SeaRole color={formatColor(role.color)} text={role.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
      <Dialog open={dialogDel} onClose={() => setDialogDel(false)}>
        <DialogTitle>Prompt</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to delete this rule?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setDialogDel(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={bindConfirmDel} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={dialogOn} onClose={() => setDialogOn(false)}>
        <DialogTitle>Prompt</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to turn on this role assignment?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setDialogOn(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={bindConfirmOn}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={dialogOff} onClose={() => setDialogOff(false)}>
        <DialogTitle>Prompt</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to turn off this role assignment?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setDialogOff(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={bindConfirmOff}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Page
