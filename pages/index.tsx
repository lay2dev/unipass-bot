import type { NextPage } from 'next'
import * as React from 'react'
import Role from '../components/role'
import css from './index.module.scss'
import SeaSwitch from '../components/sea-switch'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
const Page: NextPage = () => {
  const bindSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('🌊', event.target.checked)
  }
  return (
    <div className={css.role}>
      <div className="sea-border">
        <div className={css.roleInfo}>
          <h3>Role</h3>
          <Role color="#c4505e" text="OG User" />
          <SeaSwitch className={css.switch} onChange={bindSwitch} defaultChecked={true} />
          <IconButton sx={{ marginLeft: '8px' }}>
            <KeyboardArrowUpIcon />
          </IconButton>
        </div>
        <ul className={css.roleTip}>
          <li>{'UniPass Level >= Lv4'}</li>
          <li>{'Contract 0x2623...0736, amount ≥ 100'}</li>
        </ul>
        <div>
          <h3>Set Role</h3>
          <Select defaultValue="OG User">
            <MenuItem value="OG User">
              <Role color="#c4505e" text="OG User" />
            </MenuItem>
            <MenuItem value="UP Lv1">
              <Role color="#4fab9f" text="UP Lv1" />
            </MenuItem>
            <MenuItem value="UP Lv2">
              <Role color="#3b7669" text="UP Lv2" />
            </MenuItem>
          </Select>
          <h3>Set Requirement</h3>
          <Paper elevation={12} sx={{ padding: '20px' }}>
            <h4>UniPass requirement</h4>
            <Select sx={{ marginLeft: '6px' }} defaultValue="Level">
              <MenuItem value="Level">Level</MenuItem>
            </Select>
            <Select sx={{ marginLeft: '6px' }} defaultValue=">=">
              <MenuItem value=">=">{'>='}</MenuItem>
              <MenuItem value="<=">{'<='}</MenuItem>
              <MenuItem value="=">{'='}</MenuItem>
              <MenuItem value=">">{'>'}</MenuItem>
              <MenuItem value="<">{'<'}</MenuItem>
            </Select>
            <Select sx={{ marginLeft: '6px' }} defaultValue="Lv4">
              <MenuItem value="Lv4">{'Lv4'}</MenuItem>
            </Select>
          </Paper>
          <Paper elevation={12} sx={{ padding: '20px', marginTop: '20px' }}>
            <h4>Asset requirement</h4>
            <h5 className={css.h5}>Contract address</h5>
            <Select sx={{ marginRight: '6px' }} defaultValue="Ethereum">
              <MenuItem value="Ethereum">Ethereum</MenuItem>
              <MenuItem value="BTC">BTC</MenuItem>
            </Select>
            <TextField sx={{ width: '500px' }} variant="outlined" placeholder="Contract address" />
            <Button sx={{ marginLeft: '6px' }}>NFT</Button>
            <h5 className={css.h5}>Amount</h5>
            <Select defaultValue="Amount">
              <MenuItem value="Amount">Amount</MenuItem>
              <MenuItem value="CKB">CKB</MenuItem>
            </Select>
            <Select sx={{ marginLeft: '6px' }} defaultValue=">=">
              <MenuItem value=">=">{'>='}</MenuItem>
              <MenuItem value="<=">{'<='}</MenuItem>
              <MenuItem value="=">{'='}</MenuItem>
              <MenuItem value=">">{'>'}</MenuItem>
              <MenuItem value="<">{'<'}</MenuItem>
            </Select>
            <TextField sx={{ marginLeft: '6px' }} defaultValue={1} type="number" />
          </Paper>
          <div className={css.newRequirement}>
            <h4>Add a new requirement</h4>
            <Button variant="outlined" disabled>
              UniPass
            </Button>
            <Button variant="contained" sx={{ marginLeft: '8px' }}>
              Asset
            </Button>
          </div>
          <div className={css.save}>
            <Button sx={{ width: '38.2%' }} variant="outlined" color="secondary">
              Save
            </Button>
          </div>
        </div>
      </div>
      <Box className="sea-border" sx={{ marginTop: '60px' }}>
        <div className={css.roleInfo}>
          <h3>Role</h3>
          <Role color="#4fab9f" text="New User" />
          <SeaSwitch className={css.switch} onChange={bindSwitch} defaultChecked={false} />
          <IconButton sx={{ marginLeft: '8px' }}>
            <KeyboardArrowUpIcon sx={{ transform: 'rotate(180deg)' }} />
          </IconButton>
        </div>
        <ul className={css.roleTip}>
          <li>{'UniPass Level ≥ Lv2'}</li>
        </ul>
      </Box>
    </div>
  )
}

export default Page
