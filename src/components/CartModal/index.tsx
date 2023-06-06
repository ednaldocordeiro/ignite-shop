import * as Dialog from '@radix-ui/react-dialog';
import { Badge, CartButton, CartInfo, Close, Content, ImageContainer, Overlay, Product, ProductContainer } from './style';
import { ShoppingCart, X } from '@phosphor-icons/react';
import Image from 'next/image';

import camisa from '../../assets/1.png'

interface CartModal extends Dialog.DialogContentProps {}

const array = [1, 2, 3, 4, 5]

export function CartModal({ className }: CartModal) {

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CartButton>
          <ShoppingCart size={28} color='white' />
          <Badge>2</Badge>
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
            {array.map((item) => (
              <Product key={item} className='keen-slider__slide'>
                <ImageContainer>
                  <Image src={camisa} width={93} height={100} alt='' />
                </ImageContainer>
                <div>
                  <h1>Camiseta Beyond the Limits</h1>
                  <strong>R$ 79,90</strong>
                  <button>Remover</button>
                </div>
              </Product>
            ))}
          </ProductContainer>
          <CartInfo>
            <div>
              <span>Quantidade</span>
              <span>3 itens</span>
            </div>
            <div>
              <strong>Valor total</strong>
              <strong>R$ 79,90</strong>
            </div>

            <button>Finalizar compra</button>
          </CartInfo>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
