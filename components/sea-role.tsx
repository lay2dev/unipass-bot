import Button from '@mui/material/Button'
import { SeaIcon } from '../components'
import { SxProps, Theme } from '@mui/material'
export default function Page(props: { color: string; text: string; sx?: SxProps<Theme> }) {
  return (
    <Button
      sx={{
        borderRadius: '10px',
        background: 'rgba(0, 0, 0, 0.04)',
        textTransform: 'none',
        color: props.color,
        borderColor: props.color,
        '&:hover': {
          borderColor: props.color,
        },
        ...props.sx,
      }}
      color="inherit"
    >
      <SeaIcon
        icon="akar-icons:circle-fill"
        sx={{
          marginRight: '4px',
        }}
      />
      {props.text}
    </Button>
  )
}
