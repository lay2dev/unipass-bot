import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import css from './nav-tabs.module.scss'
export default function VerticalTabs() {
  const [tab, setTab] = React.useState(0)
  const tabs = ['Give Roles', 'Channel Manage', 'Test Page']
  const tabList = tabs.map((e, i) => <Tab key={i} className={css.tab} label={e} />)
  const bindTab = (event: React.SyntheticEvent, v: number) => {
    setTab(v)
  }
  return (
    <Tabs orientation="vertical" variant="scrollable" value={tab} onChange={bindTab}>
      {tabList}
    </Tabs>
  )
}
