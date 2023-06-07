import { stripe } from '@/lib/stripe';
import { ImageContainer, Images, SuccessContainer } from '@/styles/pages/success';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import Stripe from 'stripe';
import { useShoppingCart } from 'use-shopping-cart';

interface Product {
  name: string;
  imageUrl: string;
}

interface SuccessProps {
  customerName: string;
  products: { imageUrl: string }[];
  quantity: number;
  status: 'open' | 'complete' | 'expired';
}

export default function Success({
  customerName,
  products,
  quantity,
  status,
}: SuccessProps) {
  const {clearCart} = useShoppingCart()
  useEffect(() => {
    if (status === 'complete') {
      clearCart()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name='robots' content='noindex' />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada</h1>

        <Images>
          {products.map((product) => (
            <ImageContainer key={product.imageUrl}>
              <Image
                src={product.imageUrl}
                alt=''
                width={120}
                height={110}
              />
            </ImageContainer>
          ))}
        </Images>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de{' '}
          <strong>{quantity}</strong> camisas já está a caminho da sua casa.
        </p>

        <Link href='/'>Voltar para o catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
    expand: ['data.price.product'],
  });

  const customerName = session.customer_details?.name || '';

  const products = lineItems.data.map((lineItem) => {
    const product = lineItem.price?.product as Stripe.Product;
    return {
      imageUrl: product.images[0],
    };
  });

  const quantity = lineItems.data.reduce((count, lineItem) => {
    return count + (lineItem.quantity || 0);
  }, 0);

  return {
    props: {
      customerName,
      products,
      quantity,
      status: session.status,
    },
  };
};
