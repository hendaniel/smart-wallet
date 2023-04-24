import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '@/theme'
import '../theme/index.css'

export default function App({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
