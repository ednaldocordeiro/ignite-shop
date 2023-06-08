import { styled } from "@/styles"

import {Content as DialogContent, Overlay as DialogOverlay, Close as DialogClose} from '@radix-ui/react-dialog'


export const CartButton = styled('button', {
  backgroundColor: '$gray800',
  border: '0',
  padding: '.5rem',
  borderRadius: '6px',

  cursor: 'pointer',

  position: 'relative',

  variants: {
    size: {
      mobile: {
        svg: {
          maxWidth: '1.3rem',
          maxHeight: '1.3rem',
        }
      },
      tablet: {
        svg: {
          maxWidth: '1.5rem',
          maxHeight: '1.5rem',
        }
      }
    }
  }
})

export const Badge = styled('span', {
  position: 'absolute',
  top: -15,
  right: -15,

  background: '$green500',
  borderRadius: '50%',
  width: '2rem',
  minHeight: '2rem',
  
  textAlign: 'center',
  fontWeight: 'bold',
  color: '$white',
  border: '5px solid $gray900',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const Overlay = styled(DialogOverlay, {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.1)',
})

export const Close = styled(DialogClose, {
  border: 'none',
  background:  'transparent',
  color: '$gray300',

  position: 'absolute',
  right: 30,
})

export const Content = styled(DialogContent, {
  position: 'fixed',
  top: '0%',
  right: '0%',
  height: '100vh',
  width: 480,
  backgroundColor: '$gray900',
  padding: '3rem',

  display: 'flex',
  flexDirection: 'column',

  transition: '.5s',

  '-webkit-box-shadow': '-10px 0px 41px -14px rgba(0,0,0,0.75)',
  '-moz-box-shadow': '-10px 0px 41px -14px rgba(0,0,0,0.75)',
  boxShadow: '-10px 0px 41px -14px rgba(0,0,0,0.75)',

  variants: {
    full: {
      tablet: {
        width: '100%',
        padding: '1.5rem',
      },
      desktop: {
        width: 480,
      }
    }
  }
})

export const ProductContainer = styled('div', {
  margin: '2rem 0',

  display: 'flex',
  flexDirection: 'column',
  gap: "1.5rem",

  height: '75%',
  overflowY: 'scroll',

  '&::-webkit-scrollbar': {
    display: 'none',
  }
})

export const Product = styled('div', {
  display: 'flex',
  gap: '1rem',

  div: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    
    padding: '.3rem 0',

    h1: {
      fontSize: '1.1rem',
      color: '$gray300',
      fontWeight: 'normal',
    },

    strong: {
      fontSize: '1.1rem',
    },

    button: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '$green500',
      cursor: 'pointer',
    }
  }
});

export const ImageContainer = styled('div', {
  width: 93,
  height: 100,
  background: '$green500',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
    width: '100%',
  }
})

export const CartInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '.5rem',

  div: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',

    strong: {
      fontSize: '1.1rem',
    },
    'strong:nth-last-child(1)': {
      fontSize: '1.5rem',
    }
  },

  button: {
    marginTop: '1.5rem',
    backgroundColor: '$green500',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',

    transition: 'background-color 0.3s',

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },

    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
    }
  }
})
