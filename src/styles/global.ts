import { globalCss } from ".";

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  body: {
    '-webkit-font-smoothing': 'antialiased',
    backgroundColor: "$gray900",
    color: "$gray100",
    width: '100vw',
    height: '100vh',
  },

  'body, input, textarea, button': {
    fontWeight: 400,
  }
})