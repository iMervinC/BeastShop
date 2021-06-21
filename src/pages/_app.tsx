import { AppProps } from 'next/app'
import '../styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '@/utilities/apollo'

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
