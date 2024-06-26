import { IContext } from '../..';
import { IObjectTypeResolver } from '@graphql-tools/utils';

const subscriptionProductQueries: IObjectTypeResolver<any, IContext> = {
  async forumSubscriptionProduct(_, { _id }, { models: { SubscriptionProduct } }) {
    return SubscriptionProduct.findByIdOrThrow(_id);
  },
  async forumSubscriptionProducts(
    _,
    { sort = {}, userType },
    { models: { SubscriptionProduct } }
  ) {
    const query: any = {};
    if (userType) {
      query.userType = userType;
    }
    return SubscriptionProduct.find(query)
      .sort(sort)
      .lean();
  }
};

export default subscriptionProductQueries;
