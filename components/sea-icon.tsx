import { Icon } from '@iconify/react'
import { Box, SxProps, Theme } from '@mui/material'

// ----------------------------------------------------------------------

interface IconType {
  icon: string
  className?: string
  sx?: SxProps<Theme>
}
export default function SeaIcon({ icon, sx, className }: IconType) {
  return (
    <Box className={'sea-icon ' + className || ''} component={Icon} icon={icon} sx={{ ...sx }} />
  )
}
