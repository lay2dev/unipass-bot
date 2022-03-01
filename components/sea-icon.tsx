import { Icon } from '@iconify/react'
import { Box, SxProps, Theme } from '@mui/material'

// ----------------------------------------------------------------------

interface IconType {
  icon: string
  sx?: SxProps<Theme>
}

export default function SeaIcon({ icon, sx, ...other }: IconType) {
  return <Box className="sea-icon" component={Icon} icon={icon} sx={{ ...sx }} {...other} />
}
