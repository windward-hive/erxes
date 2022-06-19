import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';
import { mutations } from '../graphql';
import { Alert } from '@erxes/ui/src/utils';
import List from '../components/List';

type Props = {
  data: any;
  refetch: () => void;
};

function ListContainer(props: Props) {
  const { data, refetch } = props;
  const [remove] = useMutation(gql(mutations.removeSalesLog));

  const removeData = (_id: string) => {
    remove({ variables: { _id } })
      .then(() => {
        Alert.success('Successfully removed');
      })
      .catch(e => {
        Alert.error(e.message);
      });
  };

  return <List removeData={removeData} data={data} />;
}
export default ListContainer;