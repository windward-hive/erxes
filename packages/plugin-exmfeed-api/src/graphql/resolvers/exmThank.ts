const ExmThanks = {
  async createdUser(exmThank) {
    return (
      exmThank.createdBy && {
        __typename: 'User',
        _id: exmThank.createdBy
      }
    );
  },

  async recipients({ recipientIds }) {
    console.log('recipientIds: ', recipientIds);

    return (recipientIds || []).map(_id => ({
      __typename: 'User',
      _id
    }));
  }
};

export default ExmThanks;
