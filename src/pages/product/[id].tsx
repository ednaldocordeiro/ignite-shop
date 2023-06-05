import { stripe } from '@/lib/stripe';
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/styles/pages/product';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Stripe from 'stripe';
import { useShoppingCart } from 'use-shopping-cart';

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  description: string;
  defaultPriceId: string;
  unit_amount: number;
  currency: string;
}
interface ProductProps {
  product: Product;
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter();
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

  const {addItem} = useShoppingCart()

  if (isFallback) return <p>Loading...</p>;


  async function handleAddToCart() {
    const productInfo = {
      id: product.id,
      name: product.name,
      price: product.unit_amount,
      priceId: product.defaultPriceId,
      currency: product.currency.toUpperCase(),
      sku: '',
    }

    addItem(productInfo);

    // try {
    //   setIsCreatingCheckoutSession(true)
    //   const response = await axios.post('/api/checkout', {
    //     priceId: product.defaultPriceId
    //   });
    //   const {checkoutUrl} = response.data;

    //   window.location.href = checkoutUrl;
    // } catch (error) {
    //   console.log(error);
    //   alert('Falha ao redirecionar ao checkout');
    //   setIsCreatingCheckoutSession(false);
    // }
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt='' />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button disabled={isCreatingCheckoutSession} onClick={handleAddToCart}>Adicionar no carrinho</button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

// FALLBACK
// id do produto não esteja no path
// false -> 404
// true -> executa o getStaticProps para buscar o produto, porém mostra o HTML mesmo sem dados
// "blocking" -> não mostra nada em tela até ter algo para mostrar (demora viu)

export const getStaticPaths: GetStaticPaths = async () => {
  // buscar os produtos mais vendidos / mais acessados

  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id;
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id,
        unit_amount: price.unit_amount,
        currency: price.currency,
      },
    },
    revalidate: 60 * 60 * 1, //1 hora
  };
};
