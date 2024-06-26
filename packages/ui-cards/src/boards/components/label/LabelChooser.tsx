import { ColorButton } from '../../styles/common';
import Icon from '@erxes/ui/src/components/Icon';
import { __, Alert } from '@erxes/ui/src/utils';
import * as React from 'react';
import Popover from '@erxes/ui/src/components/Popover';
import { ChooseLabelWrapper } from '../../styles/label';
import { IPipelineLabel } from '../../types';
import Overlay from './Overlay';

type Props = {
  pipelineId: string;
  selectedLabelIds: string[];
  labels: IPipelineLabel[];
  doLabel: (labelIds: string[]) => void;
  isConfirmVisible: boolean;
  toggleConfirm: (callback?: () => void) => void;
  onChangeRefresh: () => void;
};

class ChooseLabel extends React.Component<
  Props,
  { selectedLabelIds: string[] }
> {
  private overlayTrigger;

  constructor(props) {
    super(props);

    this.state = { selectedLabelIds: props.selectedLabelIds };
  }

  componentDidUpdate(prevProps: Props) {
    if (
      this.props.selectedLabelIds.toString() !==
      prevProps.selectedLabelIds.toString()
    ) {
      this.setState({ selectedLabelIds: this.props.selectedLabelIds });
    }
  }

  onOverlayClose = () => {
    this.overlayTrigger.hide();
  };

  onSelectLabels = (selectedLabelIds: string[]) => {
    this.setState({ selectedLabelIds });

    this.props.doLabel(selectedLabelIds);
    Alert.success('You successfully updated a label');
  };

  renderOverlay() {
    const { labels, toggleConfirm, pipelineId, onChangeRefresh } = this.props;
    const { selectedLabelIds } = this.state;

    const props = {
      pipelineId,
      selectedLabelIds,
      labels,
      toggleConfirm,
      onClose: this.onOverlayClose,
      onSelectLabels: this.onSelectLabels,
      onChangeRefresh,
    };

    return <Overlay {...props} />;
  }

  render() {
    return (
      <ChooseLabelWrapper>
        <Popover
          placement="bottom-start"
          trigger={
            <ColorButton>
              <Icon icon="label-alt" />
              {__('Labels')}
            </ColorButton>
          }
        >
          {this.renderOverlay()}
        </Popover>
      </ChooseLabelWrapper>
    );
  }
}

export default ChooseLabel;
