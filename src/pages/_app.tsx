import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'

import { Roboto_Flex } from 'next/font/google'

import logo from '../assets/logo.svg'
import Image from 'next/image'
import { Container, Header } from '@/styles/pages/app'

const roboto = Roboto_Flex({ subsets: ['latin'] })

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container className={`${roboto.className}`}>
      <Header>
        <Image src={logo} alt="" />
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
