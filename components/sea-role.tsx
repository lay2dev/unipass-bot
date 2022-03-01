import Button from '@mui/material/Button'
import { SeaIcon } from '../components'
import { SxProps, Theme } from '@mui/material'
export default function Page(props: { color: string; text: string; sx?: SxProps<Theme> }) {
  return (
    <Button
      className="sea-role"
      sx={{
        color: props.color,
        borderColor: props.color,
        '&:hover': {
          borderColor: props.color,
        },
        ...props.sx,
      }}
      color="inherit"
    >
      <SeaIcon icon="akar-icons:circle-fill" />
      {props.text}
    </Button>
  )
}
