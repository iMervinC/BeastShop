import type { NormalizedCacheObject, ApolloClient } from '@apollo/client'

export type InitialApolloState = (
  initialState?: NormalizedCacheObject | null
) => ApolloClient<NormalizedCacheObject>
