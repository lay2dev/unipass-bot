import { SeaIcon } from '../components'
import { SxProps, Theme, Button } from '@mui/material'
export default function Page(props: {
  color: string
  text: string
  sx?: SxProps<Theme>
  hideIcon?: boolean
}) {
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
      {!props.hideIcon && <SeaIcon icon="akar-icons:circle-fill" />}
      {props.text}
    </Button>
  )
}
