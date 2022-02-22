import * as React from 'react'
import { useRouter } from 'next/router'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
export default function NavTabs() {
  const router = useRouter()
  const [tab, setTab] = React.useState(0)
  const tabs = [
    {
      label: 'Give Roles',
      path: '/',
    },
    {
      label: 'Channel Manage',
      path: '/about',
    },
    {
      label: 'Test Page',
      path: '/test',
    },
  ]
  const tabList = tabs.map((e, i) => (
    <Tab
      key={i}
      sx={{
        alignItems: 'flex-start',
        textTransform: 'none',
      }}
      label={e.label}
    />
  ))
  const bindTab = (event: React.SyntheticEvent, i: number) => {
    setTab(i)
    const tab = tabs[i]
    router.push(tab.path)
  }
  return (
    <Tabs orientation="vertical" variant="scrollable" value={tab} onChange={bindTab}>
      {tabList}
    </Tabs>
  )
}
