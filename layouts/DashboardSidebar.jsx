import React from 'react'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
// material
import { styled } from '@mui/material/styles'
import {
  Box,
  Button,
  Drawer,
  Typography,
  Stack,
  MenuItem,
  Select,
  FormHelperText,
  FormControl,
} from '@mui/material'
// hooks
import useResponsive from './useResponsive'
// components
import Logo from './Logo'
import Scrollbar from './Scrollbar'
import NavSection from './NavSection'
import sidebarConfig from './SidebarConfig'
import { message } from 'antd'
// js
import api from '../assets/js/api'
import { useStore } from '../assets/js/store'

const DRAWER_WIDTH = 280

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}))

const DashboardSidebar = ({ isOpenSidebar, onCloseSidebar }) => {
  const router = useRouter()
  const { pathname } = router
  const isDesktop = useResponsive('up', 'lg')
  const [state, dispatch] = useStore()
  const { servers } = state.account
  const [server, setServer] = React.useState(0)
  // server select
  const init = () => {
    try {
      const accountJSON = window.localStorage.getItem('UP-BOT') || ''
      const account = JSON.parse(accountJSON)
      const server = account.servers[0]
      setServer(server.id)
      dispatch({ account, server: server.id })
      if (account.accessToken) {
        api.defaults.headers.common['Authorization'] = 'Bearer ' + account.accessToken
        if (router.route === '/login') {
          router.replace('/')
        }
        return
      }
    } catch (error) {}
    if (router.route !== '/login') {
      router.replace('/login')
      message.info('请先登录')
    }
  }
  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar()
    }
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])
  const bindServer = (event) => {
    const v = event.target.value
    if (v === '+') {
      return
    }
    dispatch({ server: v })
    setServer(v)
  }
  const bindAddNew = () => {
    window.open(
      'https://discord.com/api/oauth2/authorize?client_id=947674530669793320&permissions=8&scope=bot applications.commands',
    )
  }
  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <FormControl fullWidth>
          <Select size="small" value={server} onChange={bindServer}>
            {servers.map((e, i) => (
              <MenuItem key={i} value={e.id}>
                {e.name}
              </MenuItem>
            ))}
            <MenuItem value="+" onClick={bindAddNew}>
              + Add new server
            </MenuItem>
          </Select>
          <FormHelperText>Choose your server</FormHelperText>
        </FormControl>
      </Box>

      <NavSection navConfig={sidebarConfig} />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack
          alignItems="center"
          spacing={3}
          sx={{ pt: 5, borderRadius: 2, position: 'relative' }}
        >
          <Box
            component="img"
            src="/illustration_avatar.png"
            sx={{ width: 100, position: 'absolute', top: -50 }}
          />

          <Box sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h6">
              Need help?
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Please check our docs
            </Typography>
          </Box>

          <Button
            href="https://www.creative-tim.com/learning-lab/material-ui-marketplace/quick-start/soft-ui-dashboard/"
            target="_blank"
            variant="contained"
          >
            Documentation
          </Button>
        </Stack>
      </Box>
    </Scrollbar>
  )
  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  )
}

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
}

export default DashboardSidebar
