import Button from '@mui/material/Button'
import Circle from '@mui/icons-material/Circle'

export default function Page(props: { color: string; text: string }) {
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
      }}
      color="inherit"
      startIcon={<Circle htmlColor={props.color} />}
    >
      {props.text}
    </Button>
  )
}
