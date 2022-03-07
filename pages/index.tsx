import { message } from 'antd'
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import {
  Button,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material'
import UP, { UPAuthMessage } from 'up-core-test'
import { SeaSwitch, SeaRole, SeaIcon } from '../components'
import { useStore } from '../assets/js/store'
import api from '../assets/js/api'
import {
  RangeType,
  UniPassLevel,
  Chain,
  Rule,
  Role,
  UniPassRequirement,
  AssetRequirement,
} from '../assets/js/role.dto'

const Page: NextPage = () => {
  const [state] = useStore()
  const [roles, setRoles] = useState([] as Role[])
  const [rules, setRules] = useState([] as Rule[])
  useEffect(() => {
    api.get('/roles/' + state.server + '/rule').then((res) => {
      const rules = res.data
      if (rules) {
        console.log('rules', rules)
        setRules(rules)
      }
    })
    api.get('/roles/' + state.server).then((res) => {
      const roles = res.data
      if (roles) {
        console.log('roles', roles)
        setRoles(roles)
      }
    })
  }, [state.server])
  const bindSave = async (rule: Rule) => {
    console.log('rule', rule)
    // sign
    const account = state.account
    const server = account.servers.find((e: { id: string }) => e.id === state.server)
    const timestamp = String(Date.now())
    const ret = await UP.authorize(new UPAuthMessage('PLAIN_MSG', account.username, timestamp))
    const { sig, pubkey } = ret
    const { uniPassRequirement, assetRequirement, open } = rule
    const res = await api.post('/roles/rule', {
      guildId: server.id,
      roleId: rule.role.id,
      id: 0,
      key: pubkey,
      sig,
      raw: timestamp,
      open,
      uniPassRequirement,
      assetRequirement,
    })
    if (res.code === 2000) {
      message.success('保存成功!')
    } else {
      message.error('保存失败!')
    }
  }
  const uniPassRequirementFormat = (e: UniPassRequirement) => {
    return `UniPass Level >= Lv${e.level.level}`
  }
  const formatAddress = function (address: string) {
    if (!address) {
      return ''
    }
    const prefix = address.slice(0, 6)
    const suffix = address.slice(-4)
    return prefix + '...' + suffix
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
  const formatRange = (range: number) => {
    if (range === RangeType.Equal) {
      return '='
    } else if (range === RangeType.MoreThanOrEqual) {
      return '≥'
    } else if (range === RangeType.LessThanOrEqual) {
      return '≤'
    }
  }
  const assetRequirementFormat = (e: AssetRequirement) => {
    return `Contract ${formatAddress(e.address)}, amount ${formatRange(e.range)} ${e.amount}`
  }
  const bindDel = (type: string, i: number, i2: number) => {
    if (type === 'unipass') {
      rules[i].uniPassRequirement.splice(i2, 1)
      setRules([...rules])
    } else if (type === 'asset') {
      rules[i].assetRequirement.splice(i2, 1)
      setRules([...rules])
    }
  }
  const bindAdd = (type: string, i: number) => {
    if (type === 'unipass') {
      rules[i].uniPassRequirement.push({
        level: {
          level: UniPassLevel.LV0,
          range: RangeType.MoreThanOrEqual,
        },
      })
      setRules([...rules])
    } else if (type === 'asset') {
      rules[i].assetRequirement.push({
        chain: Chain.eth,
        address: '',
        range: RangeType.MoreThanOrEqual,
        amount: 0,
      })
      setRules([...rules])
    }
  }
  const bindOpen = (event: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const open = event.target.checked
    rules[i].open = open
  }
  const bindRuleAdd = () => {
    const role = roles[0]
    const rule = {
      ruleId: 0,
      role,
      uniPassRequirement: [],
      assetRequirement: [],
      open: true,
    } as Rule
    rules.push(rule)
    setRules([...rules])
  }
  const bindRole = (event: SelectChangeEvent, i: number) => {
    const role = roles.find((e) => event.target.value === e.id)
    if (role) {
      rules[i].role = role
      setRules([...rules])
    }
  }
  return (
    <div id="page-index">
      {rules.map((e: Rule, i) => {
        return (
          <Accordion key={i} className="sea-box-one">
            <AccordionSummary
              expandIcon={<SeaIcon sx={{ fontSize: '32px' }} icon="ic:round-expand-more" />}
            >
              <Typography className="info">
                <div className="title">
                  <div className="sea-h3">Rule</div>
                  <SeaRole color={formatColor(e.role.color)} text={e.role.name} />
                  <SeaSwitch
                    onClick={(event) => {
                      event.stopPropagation()
                    }}
                    className="switch"
                    onChange={(event) => bindOpen(event, i)}
                    defaultChecked={e.open}
                  />
                </div>
                <div className="tip-box">
                  <ul>
                    {e.uniPassRequirement.map((e, i) => (
                      <li key={i}>{uniPassRequirementFormat(e)}</li>
                    ))}
                    {e.assetRequirement.map((e, i) => (
                      <li key={i}>{assetRequirementFormat(e)}</li>
                    ))}
                  </ul>
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className="sea-h3">Set Role</div>
                <Select size="small" value={e.role.id} onChange={(event) => bindRole(event, i)}>
                  {roles.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      <SeaRole color={formatColor(role.color)} text={role.name} />
                    </MenuItem>
                  ))}
                </Select>
                <div className="sea-h3">Set Requirement</div>
                {e.uniPassRequirement.length > 0 &&
                  e.uniPassRequirement.map((e, i2) => (
                    <Paper key={i2} className="sea-paper rule-one" elevation={12}>
                      <div className="left">
                        <h4>UniPass requirement</h4>
                        <div className="sea-operation-box">
                          <Select size="small" defaultValue="Level" disabled>
                            <MenuItem value="Level">Level</MenuItem>
                          </Select>
                          <Select size="small" defaultValue={e.level.range}>
                            <MenuItem value={0}>{'≥'}</MenuItem>
                            <MenuItem value={1}>{'≤'}</MenuItem>
                            <MenuItem value={2}>{'='}</MenuItem>
                          </Select>
                          <Select
                            size="small"
                            defaultValue={e.level.level}
                            onChange={(event) => (e.level.level = Number(event.target.value))}
                          >
                            {[0, 1, 2, 3, 4, 5, 6].map((lv) => (
                              <MenuItem key={lv} value={lv}>
                                Lv{lv}
                              </MenuItem>
                            ))}
                          </Select>
                        </div>
                      </div>
                      <IconButton
                        className="right delete"
                        aria-label="delete"
                        color="error"
                        onClick={() => bindDel('unipass', i, i2)}
                      >
                        <SeaIcon icon="fluent:delete-24-filled" />
                      </IconButton>
                    </Paper>
                  ))}
                {e.assetRequirement.length > 0 &&
                  e.assetRequirement.map((asset, i2) => (
                    <Paper key={i2} className="sea-paper rule-one" elevation={12}>
                      <div className="left">
                        <h4>Asset requirement</h4>
                        <h5>Contract address</h5>
                        <div className="sea-operation-box">
                          <Select size="small" defaultValue={asset.chain} disabled>
                            <MenuItem value={Chain.eth}>Ethereum</MenuItem>
                          </Select>
                          <TextField
                            size="small"
                            defaultValue={asset.address}
                            onChange={(event) => (asset.address = event.target.value)}
                            variant="outlined"
                            placeholder="Contract address"
                          />
                          <Button onClick={() => message.warn('NFT 弹窗，正在开发')}>NFT</Button>
                        </div>
                        <h5>Amount</h5>
                        <div className="sea-operation-box">
                          <Select size="small" defaultValue="Amount" disabled>
                            <MenuItem value="Amount">Amount</MenuItem>
                          </Select>
                          <Select
                            size="small"
                            value={asset.range}
                            onChange={(event) => {
                              asset.range = Number(event.target.value)
                              setRules([...rules])
                            }}
                          >
                            <MenuItem value={0}>{'≥'}</MenuItem>
                            <MenuItem value={1}>{'≤'}</MenuItem>
                            <MenuItem value={2}>{'='}</MenuItem>
                          </Select>
                          <TextField
                            size="small"
                            defaultValue={asset.amount}
                            onChange={(event) => {
                              asset.amount = Number(event.target.value)
                              setRules([...rules])
                            }}
                            type="number"
                          />
                        </div>
                      </div>
                      <IconButton
                        className="right delete"
                        aria-label="delete"
                        color="error"
                        onClick={() => bindDel('asset', i, i2)}
                      >
                        <SeaIcon icon="fluent:delete-24-filled" />
                      </IconButton>
                    </Paper>
                  ))}
                <div className="new-requirement">
                  <h4>Add a new requirement</h4>
                  <div className="sea-operation-box">
                    <Button variant="outlined" onClick={() => bindAdd('unipass', i)}>
                      UniPass requirement
                    </Button>
                    <Button variant="contained" onClick={() => bindAdd('asset', i)}>
                      Asset requirement
                    </Button>
                  </div>
                </div>
                <div className="save">
                  <Button
                    className="submit"
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      bindSave(e)
                    }}
                  >
                    Save
                  </Button>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        )
      })}
      <div className="sea-new-box">
        <Button onClick={bindRuleAdd}>+ Add a new rule rule</Button>
      </div>
    </div>
  )
}
export default Page
