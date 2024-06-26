import { Model } from 'mongoose';
import { IModels } from '../connectionResolver';
import {
  IWishlist,
  IWishlistDocument,
  wishlistSchema
} from './definitions/wishlist';

export interface IWishlistModel extends Model<IWishlistDocument> {
  getWishlistById(_id: string): Promise<IWishlistDocument>;
  createWishlist(doc: IWishlist): Promise<IWishlistDocument>;
  updateWishlist(_id: string, doc: IWishlist): Promise<IWishlistDocument>;
  removeWishlist(_id: string): Promise<IWishlistDocument>;
}

export const loadWishlistClass = (models: IModels, subdomain: string) => {
  class Wishlist {
    public static async getWishlistById(_id: string) {
      return models.Wishlist.findOne({ _id }).lean();
    }
    public static async createWishlist(doc: IWishlist) {
      const review = await models.Wishlist.create({
        ...doc,
        createdAt: new Date(),
        modifiedAt: new Date()
      });
      return review;
    }
    public static async updateWishlist(_id: string, doc: IWishlist) {
      const current = await models.Wishlist.getWishlistById(_id);
      if (current) {
        await models.Wishlist.updateOne(
          { _id },
          { $set: { ...doc, modifiedAt: new Date() } }
        );
      }
      return models.Wishlist.findOne({ _id });
    }
    public static async removeWishlist(_id: string) {
      return models.Wishlist.findOneAndDelete({ _id });
    }
  }
  wishlistSchema.loadClass(Wishlist);
  return wishlistSchema;
};
