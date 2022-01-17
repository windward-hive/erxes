import { PipelineLabels, Pipelines, Stages } from '../../../models';
import { IGrowthHackDocument } from '../../../models/definitions/growthHacks';
import { boardId } from '../../utils';
import { getDocument, getDocumentList } from '../../../cacheUtils';
import { IContext } from '@erxes/api-utils/src';
import { Fields, FormSubmissions } from '../../../db';

export default {
  async formSubmissions(growthHack: IGrowthHackDocument) {
    const stage = await Stages.getStage(growthHack.stageId);

    const result = {};

    if (stage.formId) {
      const submissions = await FormSubmissions.find({
        contentTypeId: growthHack._id,
        contentType: 'growthHack',
        formId: stage.formId
      });

      for (const submission of submissions) {
        if (submission.formFieldId) {
          result[submission.formFieldId] = submission.value;
        }
      }
    }

    return result;
  },

  async formFields(growthHack: IGrowthHackDocument) {
    const stage = await Stages.getStage(growthHack.stageId);

    const query: any = { contentType: 'form' };

    if (stage.formId) {
      query.contentTypeId = stage.formId;
    }

    return Fields.find(query).sort({ order: 1 });
  },

  assignedUsers(growthHack: IGrowthHackDocument) {
    return getDocumentList('users', {
      _id: { $in: growthHack.assignedUserIds || [] }
    });
  },

  votedUsers(growthHack: IGrowthHackDocument) {
    return getDocumentList('users', {
      _id: { $in: growthHack.votedUserIds || [] }
    });
  },

  isVoted(growthHack: IGrowthHackDocument, _args, { user }: IContext) {
    return growthHack.votedUserIds && growthHack.votedUserIds.length > 0
      ? growthHack.votedUserIds.indexOf(user._id) !== -1
      : false;
  },

  async pipeline(growthHack: IGrowthHackDocument) {
    const stage = await Stages.getStage(growthHack.stageId);

    return Pipelines.findOne({ _id: stage.pipelineId });
  },

  boardId(growthHack: IGrowthHackDocument) {
    return boardId(growthHack);
  },

  async formId(growthHack: IGrowthHackDocument) {
    const stage = await Stages.getStage(growthHack.stageId);

    return stage.formId;
  },

  async scoringType(growthHack: IGrowthHackDocument) {
    const stage = await Stages.getStage(growthHack.stageId);
    const pipeline = await Pipelines.getPipeline(stage.pipelineId);

    return pipeline.hackScoringType;
  },

  stage(growthHack: IGrowthHackDocument) {
    return Stages.getStage(growthHack.stageId);
  },

  isWatched(growthHack: IGrowthHackDocument, _args, { user }: IContext) {
    const watchedUserIds = growthHack.watchedUserIds || [];

    if (watchedUserIds.includes(user._id)) {
      return true;
    }

    return false;
  },

  labels(growthHack: IGrowthHackDocument) {
    return PipelineLabels.find({ _id: { $in: growthHack.labelIds || [] } });
  },

  createdUser(growthHack: IGrowthHackDocument) {
    return getDocument('users', { _id: growthHack.userId });
  }
};