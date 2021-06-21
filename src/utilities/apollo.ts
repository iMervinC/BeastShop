import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { InitialApolloState } from '@/utilities/types'
import { useMemo } from 'react'

let apolloClient: ApolloClient<NormalizedCacheObject>

const createIsomorphicLink = () => {
  if (typeof window === 'undefined') {
    // server
    const { SchemaLink } = require('@apollo/client/link/schema')
    const { schema } = require('@/schema')
    return new SchemaLink({ schema })
  } else {
    // client
    const { HttpLink } = require('@apollo/client/link/http')
    return HttpLink({ uri: '/api/graphql' })
  }
}

export const createApolloClient = () =>
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphicLink(),
    cache: new InMemoryCache(),
  })

export const initializeApollo: InitialApolloState = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient()

  if (initialState) _apolloClient.cache.restore(initialState!)

  if (typeof window === 'undefined') return _apolloClient

  apolloClient = apolloClient ?? _apolloClient

  return apolloClient
}

export const useApollo = (initialState: NormalizedCacheObject) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
