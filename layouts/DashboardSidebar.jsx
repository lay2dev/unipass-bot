import * as React from 'react'

import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
// material
import { styled } from '@mui/material/styles'
// import NextLink from 'next/link'
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormHelperText,
  FormControl,
} from '@mui/material'
// import account from './account'
// hooks
import useResponsive from './useResponsive'
// components
import Logo from './Logo'
import Scrollbar from './Scrollbar'
import NavSection from './NavSection'
//
import sidebarConfig from './SidebarConfig'

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

  // server select
  const [server, setServer] = React.useState('UniPass')
  const bindServer = (event) => {
    const v = event.target.value
    if (v === '+') {
      console.log('🌊', v)
      return
    }
    setServer(v)
  }

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

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

      {/* <Box sx={{ mb: 5, mx: 2.5 }}>
        <NextLink href="/" passHref>
          <Link underline="none" href="#">
            <AccountStyle>
              <Avatar src={account.photoURL} alt="photoURL" />
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                  {account.displayName}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {account.role}
                </Typography>
              </Box>
            </AccountStyle>
          </Link>
        </NextLink>
      </Box> */}

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <FormControl fullWidth>
          <Select size="small" value={server} onChange={bindServer}>
            <MenuItem value="UniPass">UniPass</MenuItem>
            <MenuItem value="Aven">Aven</MenuItem>
            <MenuItem value="+">+ Add new server</MenuItem>
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
