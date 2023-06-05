import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'

import { Roboto_Flex } from 'next/font/google'

import logo from '../assets/logo.svg'
import Image from 'next/image'
import { Container, Header } from '@/styles/pages/app'

import { CartProvider } from 'use-shopping-cart'

const roboto = Roboto_Flex({ subsets: ['latin'] })

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container className={`${roboto.className}`}>
      <Header>
        <Image src={logo} alt="" />
      </Header>
      <CartProvider
        cartMode='checkout-session'
        stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string}
        currency='BRL'
        shouldPersist
      >
        <Component {...pageProps} />
      </CartProvider>
    </Container>
  )
}
