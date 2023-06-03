import { stripe } from '@/lib/stripe';
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/styles/pages/product';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Stripe from 'stripe';

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: string;
  description: string;
  defaultPriceId: string;
}
interface ProductProps {
  product: Product;
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter();
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

  if (isFallback) return <p>Loading...</p>;


  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId
      });

      const {checkoutUrl} = response.data;

      window.location.href = checkoutUrl;
    } catch (error) {
      console.log(error);
      alert('Falha ao redirecionar ao checkout');
      setIsCreatingCheckoutSession(false);
    }
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt='' />
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
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
      },
    },
    revalidate: 60 * 60 * 1, //1 hora
  };
};
