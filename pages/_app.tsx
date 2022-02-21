// global
import './_app.scss'
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div id="app">
      <div className="nav">
        <h1>Server</h1>
      </div>
      <Component {...pageProps} />
    </div>
  )
}

export default App
