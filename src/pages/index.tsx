import { CartButton, HomeContainer, Product } from '@/styles/pages/home';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Head from 'next/head';

import { useKeenSlider } from 'keen-slider/react';

import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

import 'keen-slider/keen-slider.min.css';
import { useShoppingCart } from 'use-shopping-cart';
import { BagSimple } from '@phosphor-icons/react';

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  defaultPriceId: string;
  unit_amount: number;
  currency: string;
}

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
    breakpoints: {
      '(max-width: 1024px)': {
        slides: {
          perView: 2,
          spacing: 48,
        }
      },
      '(max-width: 720px)': {
        slides: {
          perView: 1,
          spacing: 48,
        }
      }
    }
  });

  const {addItem} = useShoppingCart()

  function handleAddProductToCart(product: Product) {
    const productInfo = {
      id: product.id,
      name: product.name,
      price: product.unit_amount,
      priceId: product.defaultPriceId,
      currency: product.currency.toUpperCase(),
      sku: '',
      image: product.imageUrl,
    }

    addItem(productInfo);
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className='keen-slider'>
        {products.map((product) => (
          <Product
            prefetch={false}
            href={`/product/${product.id}`}
            key={product.id}
            className='keen-slider__slide'
          >
            <Image
              priority={false}
              src={product.imageUrl}
              alt={product.name}
              width={520}
              height={480}
            />

            <footer>
              <div>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </div>
              <CartButton onClick={() => handleAddProductToCart(product)}>
                <BagSimple size={28} color='white' />
              </CartButton>
            </footer>
          </Product>
        ))}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
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
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 horas
  };
};
