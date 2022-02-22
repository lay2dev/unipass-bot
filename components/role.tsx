import Button from '@mui/material/Button'
import Circle from '@mui/icons-material/Circle'
import css from './role.module.scss'

export default function Page(props: { color: string; text: string }) {
  return (
    <Button
      className={css.role}
      sx={{
        color: props.color,
        borderColor: props.color,
        '&:hover': {
          borderColor: props.color,
        },
      }}
      color="inherit"
      startIcon={<Circle htmlColor={props.color} />}
    >
      {props.text}
    </Button>
  )
}
