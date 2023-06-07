import * as Dialog from '@radix-ui/react-dialog';
import {
  Badge,
  CartButton,
  CartInfo,
  Close,
  Content,
  ImageContainer,
  Overlay,
  Product,
  ProductContainer,
} from './style';
import { ShoppingCart, X } from '@phosphor-icons/react';
import Image from 'next/image';

import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart';
import { EmptyCart } from '../EmptyCart';
import axios from 'axios';
import { useState } from 'react';

interface CartModal extends Dialog.DialogContentProps {}

export function CartModal({ className }: CartModal) {
  const { cartDetails, removeItem } = useShoppingCart();
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  const cart = cartDetails ? Object.values(cartDetails) : [];
  const totalPrice = cart.reduce((price, product) => {
    return price + product.value;
  }, 0);
  const formattedPrice = formatCurrencyString({
    value: totalPrice,
    currency: 'BRL',
  });

  async function handleCheckout() {
    const prices = cart.map((product) => ({
      price: product.priceId,
      quantity: product.quantity,
    }));

    try {
      setIsCreatingCheckoutSession(true);
      const response = await axios.post('/api/checkout', {
        prices,
      });
      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (error) {
      console.log(error);
      alert('Falha ao redirecionar ao checkout');
      setIsCreatingCheckoutSession(false);
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CartButton>
          <ShoppingCart size={28} color='white' />
          {cart.length > 0 && <Badge>{cart.length}</Badge>}
        </CartButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Overlay />
        <Content className={className}>
          <Close>
            <X size={20} />
          </Close>
          <Dialog.Title>Carrinho de compras</Dialog.Title>
          <ProductContainer>
            {!cart.length && <EmptyCart />}
            {cart.map((item) => (
              <Product key={item.id} className='keen-slider__slide'>
                <ImageContainer>
                  {item.image && (
                    <Image src={item.image} width={93} height={100} alt='' />
                  )}
                </ImageContainer>
                <div>
                  <h1>{item.name}</h1>
                  <strong>{item.formattedValue}</strong>
                  <button onClick={() => removeItem(item.id)}>Remover</button>
                </div>
              </Product>
            ))}
          </ProductContainer>
          <CartInfo>
            <div>
              <span>Quantidade</span>
              <span>{cart.length} itens</span>
            </div>
            <div>
              <strong>Valor total</strong>
              <strong>{formattedPrice}</strong>
            </div>

            <button
              disabled={isCreatingCheckoutSession}
              onClick={handleCheckout}
            >
              Finalizar compra
            </button>
          </CartInfo>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
