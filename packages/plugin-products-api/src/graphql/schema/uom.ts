export const types = `
  type Uom @key(fields: "_id") @cacheControl(maxAge: 3) {
    _id: String!
    name: String
    code: String
    createdAt: Date
    isForSubscription:Boolean
    subscriptionConfig:JSON
  }
`;

const params = `
  name: String,
  code: String,
  isForSubscription:Boolean,
  subscriptionConfig:JSON
`;

export const queries = `
  uoms: [Uom]
  uomsTotalCount: Int
`;

export const mutations = `
  uomsAdd(${params}): Uom
  uomsEdit(_id: String!, ${params}): Uom
  uomsRemove(uomIds: [String!]): String
`;
