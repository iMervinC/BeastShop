import { makeSchema, queryType } from '@nexus/schema'
import { type } from 'os'
import { string } from 'prop-types'

const Query = queryType({
  definition(t) {
    t.string('name', {
      resolve: (parent, args, ctx, info) => {
        console.log(ctx)
        return 'Mervin'
      },
    })
  },
})

const types = { Query }

export const schema = makeSchema({
  types,
})
