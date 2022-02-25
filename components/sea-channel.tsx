import { Box } from '@mui/material'
export default function Page({ name }: { name: string }) {
  return (
    <Box
      sx={{
        background: '#e0e6ec',
        padding: '2px 20px',
        borderRadius: '14px',
        fontWeight: '500',
        width: '300px',
      }}
    >
      # {name}
    </Box>
  )
}
