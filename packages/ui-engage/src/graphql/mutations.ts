import { engageDetailFields } from './queries';

const setPause = `
  mutation setPause($_id: String!) {
    engageMessageSetPause(_id: $_id) {
      _id
    }
  }
`;

const setLive = `
  mutation setLive($_id: String!) {
    engageMessageSetLive(_id: $_id) {
      _id
    }
  }
`;

const setLiveManual = `
  mutation engageMessageSetLiveManual($_id: String!) {
    engageMessageSetLiveManual(_id: $_id) {
      _id
    }
  }
`;

const engagesUpdateConfigs = `
  mutation engagesUpdateConfigs($configsMap: JSON!) {
    engagesUpdateConfigs(configsMap: $configsMap)
  }
`;

const sendTestEmail = `
  mutation engageMessageSendTestEmail($from: String!, $to: String!, $content: String!, $title: String!) {
    engageMessageSendTestEmail(from: $from, to: $to, content: $content, title: $title)
  }
`;

const commonVariables = `
  $title: String!,
  $kind: String!,
  $method: String!,
  $fromUserId: String,
  $isDraft: Boolean,
  $isLive: Boolean,
  $stopDate: Date,
  $segmentIds: [String],
  $brandIds: [String],
  $customerIds: [String],
  $cpId: String,
  $customerTagIds: [String],
  $email: EngageMessageEmail,
  $scheduleDate: EngageScheduleDateInput,
  $messenger: EngageMessageMessenger,
  $notification: EngageMessageNotification,
  $shortMessage: EngageMessageSmsInput,
  $forceCreateConversation: Boolean,
`;

const commonParams = `
  title: $title,
  kind: $kind,
  method: $method,
  fromUserId: $fromUserId,
  isDraft: $isDraft,
  isLive: $isLive,
  stopDate: $stopDate,
  segmentIds: $segmentIds,
  customerTagIds: $customerTagIds,
  brandIds: $brandIds,
  customerIds: $customerIds,
  cpId: $cpId,
  email: $email,
  messenger: $messenger,
  notification: $notification,
  scheduleDate: $scheduleDate,
  shortMessage: $shortMessage,
  forceCreateConversation: $forceCreateConversation,
`;

const messagesAdd = `
  mutation engageMessageAdd(${commonVariables}) {
    engageMessageAdd(${commonParams}) {
      _id
      ${engageDetailFields}
    }
  }
`;

const messagesEdit = `
  mutation engageMessageEdit($_id: String!, ${commonVariables}) {
    engageMessageEdit(_id: $_id, ${commonParams}) {
      _id
      ${engageDetailFields}
    }
  }
`;

const messageRemove = `
  mutation engageMessageRemove($_id: String!) {
    engageMessageRemove(_id: $_id) {
      _id
    }
  }
`;

const verifyEmail = `
  mutation engageMessageVerifyEmail($email: String!, $address: String, $name: String) {
    engageMessageVerifyEmail(email: $email, address: $address, name: $name)
  }
`;

const removeVerifiedEmail = `
  mutation engageMessageRemoveVerifiedEmail($email: String!) {
    engageMessageRemoveVerifiedEmail(email: $email)
  }
`;

const segmentsAdd = `
  mutation segmentsAdd(
    $name: String!,
    $description: String,
    $subOf: String,
    $color: String,
    $conditions: [SegmentCondition],
  ) {

    segmentsAdd(
      contentType: "customer",
      name: $name,
      description: $description,
      subOf: $subOf,
      color: $color,
      conditions: $conditions,
    ) {
      _id
    }
  }
`;

const engageMessageCopy = `
  mutation engageMessageCopy($_id: String!) {
    engageMessageCopy(_id: $_id) {
      _id
    }
  }
`;

const mailParamsDef = `
  $integrationId: String,
  $conversationId: String,
  $replyTo: [String],
  $inReplyTo: String,
  $headerId: String,
  $threadId: String,
  $messageId: String,
  $references: [String]
  $replyToMessageId: String,
  $subject: String!,
  $body: String!,
  $to: [String]!,
  $cc: [String],
  $bcc: [String] ,
  $from: String!,
  $shouldResolve: Boolean,
  $shouldOpen: Boolean,
  $attachments: [JSON],
  $customerId: String
`;

const mailParams = `
  integrationId: $integrationId,
  conversationId: $conversationId,
  replyTo: $replyTo,
  inReplyTo: $inReplyTo,
  headerId: $headerId,
  threadId: $threadId,
  messageId: $messageId,
  references: $references,
  replyToMessageId: $replyToMessageId,
  subject: $subject,
  body: $body,
  to: $to,
  cc: $cc,
  bcc: $bcc,
  from: $from,
  shouldResolve: $shouldResolve,
  shouldOpen: $shouldOpen,
  attachments: $attachments,
  customerId: $customerId
`;

const sendMail = ` 
  mutation engageSendMail(${mailParamsDef}) {
    engageSendMail(${mailParams})
  }
`;

export default {
  setPause,
  setLive,
  setLiveManual,
  messageRemove,
  messagesAdd,
  messagesEdit,
  engagesUpdateConfigs,
  segmentsAdd,
  removeVerifiedEmail,
  verifyEmail,
  sendTestEmail,
  engageMessageCopy,
  sendMail,
};
