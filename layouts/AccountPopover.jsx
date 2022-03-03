import { useRef, useState } from 'react'
// material
import { alpha } from '@mui/material/styles'
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@mui/material'
// components
import SeaIcon from '../components/sea-icon'
import MenuPopover from './MenuPopover'
//
import { useStore } from '../assets/js/store'
import { useRouter } from 'next/router'

import UP from 'up-core-test'

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
    linkTo: '/',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    linkTo: '/',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
    linkTo: '/',
  },
]

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [state] = useStore()
  const { account } = state

  const bindOpen = () => {
    setOpen(true)
  }
  const router = useRouter()
  const bindClose = (path) => {
    if (path) {
      router.push(path)
    }
    setOpen(false)
  }

  const bindLogout = () => {
    setOpen(false)
    UP.disconnect()
    router.replace('/login')
  }

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={bindOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={() => bindClose()}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            onClick={() => bindClose(option.linkTo)}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <SeaIcon
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24,
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick={bindLogout}>
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  )
}
