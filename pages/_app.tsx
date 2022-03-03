import ThemeConfig from '../theme'
import GlobalStyles from '../theme/globalStyles'
import ScrollToTop from '../layouts/ScrollToTop'
import { useState } from 'react'
import { styled } from '@mui/material/styles'
import 'simplebar/src/simplebar.css'
import './_app.scss'
//
import DashboardNavbar from '../layouts/DashboardNavbar'
import DashboardSidebar from '../layouts/DashboardSidebar'

import type { AppProps } from 'next/app'
import Head from 'next/head'

const APP_BAR_MOBILE = 64
const APP_BAR_DESKTOP = 92

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
})

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
  },
}))

const App = ({ Component, pageProps }: AppProps) => {
  const [open, setOpen] = useState(false)
  return (
    <ThemeConfig>
      <Head>
        <title>UniPass BOT</title>
      </Head>
      <GlobalStyles />
      <ScrollToTop />
      <RootStyle>
        <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
        <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
        <MainStyle>
          <Component {...pageProps} />
        </MainStyle>
      </RootStyle>
    </ThemeConfig>
  )
}

export default App
