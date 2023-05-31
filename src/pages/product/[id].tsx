import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/styles/pages/product';
import Image from 'next/image';

export default function Product() {
  return (
    <ProductContainer>
      <ImageContainer></ImageContainer>
      <ProductDetails>
        <h1>Camiseta</h1>
        <span>R$ 79,90</span>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
          cupiditate vel quidem? Blanditiis, tempore quam. Expedita, soluta et
          quibusdam fugit modi rem similique, placeat beatae vel corporis
          laudantium sed iure.
        </p>

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  );
}
