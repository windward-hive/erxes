import { Model, model } from 'mongoose';
import { IModels } from '../connectionResolver';
import {
  IResponseTemplate,
  IResponseTemplateDocument,
  responseTemplateSchema
} from './definitions/responseTemplates';

export interface IResponseTemplateModel
  extends Model<IResponseTemplateDocument> {
  getResponseTemplate(_id: string): Promise<IResponseTemplateDocument>;
  updateResponseTemplate(
    _id: string,
    fields: IResponseTemplate
  ): Promise<IResponseTemplateDocument>;
  removeResponseTemplate(_id: string): void;
}

export const loadClass = (models: IModels) => {
  class ResponseTemplate {
    /*
     * Get a Pipeline template
     */
    public static async getResponseTemplate(_id: string) {
      const responseTemplate = await models.ResponseTemplates.findOne({ _id });

      if (!responseTemplate) {
        throw new Error('Response template not found');
      }

      return responseTemplate;
    }
    /**
     * Update response template
     */
    public static async updateResponseTemplate(
      _id: string,
      fields: IResponseTemplate
    ) {
      await models.ResponseTemplates.updateOne({ _id }, { $set: { ...fields } });

      return models.ResponseTemplates.findOne({ _id });
    }

    /**
     * Delete response template
     */
    public static async removeResponseTemplate(_id: string) {
      const responseTemplateObj = await models.ResponseTemplates.findOneAndDelete({ _id });

      if (!responseTemplateObj) {
        throw new Error(`Response template not found with id ${_id}`);
      }

      return responseTemplateObj;
    }
  }

  responseTemplateSchema.loadClass(ResponseTemplate);

  return responseTemplateSchema;
};