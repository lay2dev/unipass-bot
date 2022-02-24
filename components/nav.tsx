import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import NavTabs from './nav-tabs'

export default function Nav() {
  // server select
  const [server, setServer] = React.useState('UniPass')
  const bindServer = (event: SelectChangeEvent) => {
    const v = event.target.value
    if (v === '+') {
      console.log('🌊', v)
      return
    }
    setServer(v)
  }

  //

  return (
    <nav>
      <h1>Server</h1>
      <Select value={server} onChange={bindServer} fullWidth>
        <MenuItem value="UniPass">UniPass</MenuItem>
        <MenuItem value="Aven">Aven</MenuItem>
        <MenuItem value="+">+ Add new server</MenuItem>
      </Select>
      <h1>Management</h1>
      <NavTabs />
    </nav>
  )
}
