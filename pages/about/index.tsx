import type { NextPage } from 'next'

import Button from '@mui/material/Button'
import styles from '../../styles/Home.module.scss'

const About: NextPage = () => {
  const bindTest = () => {
    console.log('🌊', 'Test')
  }
  return (
    <div>
      <Button className={styles.title} variant="contained" onClick={bindTest}>
        Test
      </Button>
    </div>
  )
}

export default About
