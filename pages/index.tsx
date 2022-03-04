import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Button, IconButton, MenuItem, Select, TextField, Paper } from '@mui/material'
import UP, { UPAuthMessage } from 'up-core-test'
import { SeaSwitch, SeaRole, SeaIcon } from '../components'
import { useStore } from '../assets/js/store'
import api from '../assets/js/api'
import { RangeType, UniPassLevel, Chain } from '../assets/js/role.dto'

interface Role {
  id: string
  name: string
  color: string
  open: boolean
  uniPassRequirement: {
    level: {
      level: UniPassLevel
      range: RangeType
    }
  }[]
  assetRequirement: {
    chain: Chain
    level: UniPassLevel
    range: RangeType
    address: string
  }[]
}

const Page: NextPage = () => {
  const [state] = useStore()
  const [roles, setRoles] = useState([
    {
      id: '123',
      name: 'test',
      color: 'pink',
      open: false,
      uniPassRequirement: [
        {
          level: {
            level: UniPassLevel.LV1,
            range: RangeType.MoreThanOrEqual,
          },
        },
      ],
      assetRequirement: [
        {
          chain: Chain.eth,
          level: UniPassLevel.LV0,
          range: RangeType.Equal,
          address: '0xAF0459c2Aba429f75c99E6238C7A8470dB99E252',
        },
      ],
    } as Role,
  ])
  useEffect(() => {
    api.get('/roles/' + state.server).then((res) => {
      const roles = res.data
      if (roles) {
        setRoles(roles)
      }
    })
  }, [state.server])

  const bindSave = async (role: Role) => {
    const account = state.account
    const server = account.servers.find((e: { id: string }) => e.id === state.server)
    const timestamp = String(Date.now())
    const ret = await UP.authorize(new UPAuthMessage('PLAIN_MSG', account.username, timestamp))
    const { sig, pubkey } = ret
    console.log('server', server)
    console.log('role', role)
    const { uniPassRequirement, assetRequirement } = role
    const res = await api.post('/roles/rule', {
      guild: server.id,
      id: role.id,
      key: pubkey,
      sig,
      raw: timestamp,
      uniPassRequirement,
      assetRequirement,
    })
    console.log('🌊', res)
  }
  return (
    <div id="page-index">
      {roles.map((e: Role, i) => {
        return (
          <div key={i} className="sea-box-one">
            <div className="info">
              <h3>Role</h3>
              <SeaRole color={e.color} text={e.name} />
              <SeaSwitch
                className="switch"
                onChange={(event, open) => (roles[i].open = open)}
                defaultChecked={e.open}
              />
              <IconButton sx={{ marginLeft: '8px' }}>
                <SeaIcon icon="ic:round-keyboard-arrow-up" />
              </IconButton>
            </div>
            <div className="tip-box">
              <ul>
                <li>{'UniPass Level >= Lv4'}</li>
                <li>{'Contract 0x2623...0736, amount ≥ 100'}</li>
              </ul>
            </div>
            <div>
              <h3>Set Role</h3>
              <Select size="small" defaultValue="OG User" disabled>
                <MenuItem value="OG User">
                  <SeaRole color="#c4505e" text="OG User" />
                </MenuItem>
                <MenuItem value="UP Lv1">
                  <SeaRole color="#4fab9f" text="UP Lv1" />
                </MenuItem>
                <MenuItem value="UP Lv2">
                  <SeaRole color="#3b7669" text="UP Lv2" />
                </MenuItem>
              </Select>
              <h3>Set Requirement</h3>
              <Paper className="sea-paper" elevation={12}>
                <h4>UniPass requirement</h4>
                <div className="sea-operation-box">
                  <Select size="small" defaultValue="Level">
                    <MenuItem value="Level">Level</MenuItem>
                  </Select>
                  <Select size="small" defaultValue=">=">
                    <MenuItem value=">=">{'>='}</MenuItem>
                    <MenuItem value="<=">{'<='}</MenuItem>
                    <MenuItem value="=">{'='}</MenuItem>
                    <MenuItem value=">">{'>'}</MenuItem>
                    <MenuItem value="<">{'<'}</MenuItem>
                  </Select>
                  <Select size="small" defaultValue="Lv4">
                    <MenuItem value="Lv4">{'Lv4'}</MenuItem>
                  </Select>
                </div>
              </Paper>
              <Paper className="sea-paper" elevation={12}>
                <h4>Asset requirement</h4>
                <h5>Contract address</h5>
                <div className="sea-operation-box">
                  <Select size="small" defaultValue="Ethereum">
                    <MenuItem value="Ethereum">Ethereum</MenuItem>
                    <MenuItem value="BTC">BTC</MenuItem>
                  </Select>
                  <TextField size="small" variant="outlined" placeholder="Contract address" />
                  <Button>NFT</Button>
                </div>
                <h5>Amount</h5>
                <div className="sea-operation-box">
                  <Select size="small" defaultValue="Amount">
                    <MenuItem value="Amount">Amount</MenuItem>
                    <MenuItem value="CKB">CKB</MenuItem>
                  </Select>
                  <Select size="small" defaultValue=">=">
                    <MenuItem value=">=">{'>='}</MenuItem>
                    <MenuItem value="<=">{'<='}</MenuItem>
                    <MenuItem value="=">{'='}</MenuItem>
                    <MenuItem value=">">{'>'}</MenuItem>
                    <MenuItem value="<">{'<'}</MenuItem>
                  </Select>
                  <TextField size="small" defaultValue={1} type="number" />
                </div>
              </Paper>
              <div className="new-requirement">
                <h4>Add a new requirement</h4>
                <div className="sea-operation-box">
                  <Button variant="outlined" disabled>
                    UniPass
                  </Button>
                  <Button variant="contained">Asset</Button>
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
            </div>
          </div>
        )
      })}
      {/* <div className="sea-box-one">
        <div className="info">
          <h3>Role</h3>
          <SeaRole color="#4fab9f" text="New User" />
          <SeaSwitch className="switch" onChange={bindSwitch} defaultChecked={false} />
          <IconButton sx={{ marginLeft: '8px' }}>
            <SeaIcon icon="ic:round-keyboard-arrow-up" sx={{ transform: 'rotate(180deg)' }} />
          </IconButton>
        </div>
        <div className="tip-box">
          <ul>
            <li>{'UniPass Level ≥ Lv2'}</li>
          </ul>
        </div>
      </div> */}
      <div className="sea-new-box">
        <Button>+ Add a new role rule</Button>
      </div>
    </div>
  )
}
export default Page
