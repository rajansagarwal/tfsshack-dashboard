import '../styles/globals.css'
import { MDXProvider } from '@mdx-js/react'

const CustomCode = (props) => {
  return <code {...props} style={{ backgroundColor: 'lightblue' }} />
}

const components = {
  p: (props) => <p style={{ fontSize: '20px', paddingLeft: '10vmin' }} {...props} /> ,
  inlineCode: CustomCode,
  h1: (props) => <h1 style={{ fontSize: '40px', fontWeight: '700', paddingLeft: '10vmin' }} {...props} />,
  h2: (props) => <h2 style={{ fontSize: '40px', fontWeight: '600', paddingLeft: '10vmin' }} {...props} />,
}

function MyApp({ Component, pageProps }) {
  return (
  <MDXProvider components={components}>
  <Component {...pageProps} />
  </MDXProvider>
  )
}

export default MyApp
