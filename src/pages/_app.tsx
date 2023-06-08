import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'

import { Roboto_Flex } from 'next/font/google'

import logo from '../assets/logo.svg'
import Image from 'next/image'
import { Container, Header } from '@/styles/pages/app'

import { CartProvider } from 'use-shopping-cart'
import { CartModal } from '@/components/CartModal'
import Link from 'next/link'

const roboto = Roboto_Flex({ subsets: ['latin'] })

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider
      cartMode='checkout-session'
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string}
      currency='BRL'
      shouldPersist
    >
      <Container className={`${roboto.className}`}>
        <Header spacing={{"@tablet": 'tablet', "@mobile": 'tablet'}}>
          <Link href='/'>
            <Image src={logo} alt="" />
          </Link>
          <CartModal className={`${roboto.className}`} />
        </Header>
          <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}
