import PropTypes from 'prop-types'
import Link from 'next/link'

// material
import { Box } from '@mui/material'

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object,
}

export default function Logo({ sx }) {
  return (
    <Link href="/" passHref>
      <Box component="img" src="/images/unipass.svg" sx={{ width: 40, height: 40, ...sx }} />
    </Link>
  )
}
