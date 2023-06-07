import Link from "next/link";
import { styled } from "..";

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  minHeight: 656,
})

export const Product = styled(Link, {
  background: '$gray800',
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  overflow: 'hidden',

  img: {
    objectFit: 'cover'
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',

    borderRadius: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: '#0006',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.3s ease-in-out',

    div: {
      display: 'flex',
      flexDirection: 'column',
      gap: '.5rem',

      strong: {
        fontSize: '$lg',
        color: '$gray100'
      },
      span: {
        fontSize: '$xl',
        fontWeight: 'bold',
        color: '$green300',
      }
    }
  },

  '&:hover': {
    background: '$green500',

    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    }
  }
})

export const CartButton = styled('button', {
  backgroundColor: '$gray800',
  border: '0',
  padding: '.5rem',
  borderRadius: '6px',

  cursor: 'pointer',

  position: 'relative',

  '&:hover': {
    backgroundColor: '$green300',
  }
})