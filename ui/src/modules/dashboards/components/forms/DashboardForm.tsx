import { __ } from 'modules/common/utils';
import RTG from 'react-transition-group';
import Wrapper from 'modules/layout/components/Wrapper';
import React from 'react';
import { FormControl } from 'modules/common/components/form';
import { BarItems, HeightedWrapper } from 'modules/layout/styles';
import Button from 'modules/common/components/Button';
import Icon from 'modules/common/components/Icon';
import PageContent from 'modules/layout/components/PageContent';
import { Link } from 'react-router-dom';
import {
  CenterFlexRow,
  BackButton,
  AutomationFormContainer,
  RightDrawerContainer,
  ActionBarButtonsWrapper
} from 'modules/automations/styles';
import ChartForm from 'modules/dashboards/components/forms/ChartForm';
import { Title } from 'modules/dashboards/styles';
import { IDashboard } from 'modules/dashboards/types';

type Props = {
  dashboard: IDashboard;
  id: string;
  queryParams: any;
};

type State = {
  name: string;
  currentTab: string;
  activeId: string;
  showDrawer: boolean;
};

class DashboardForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    const { dashboard } = this.props;

    this.state = {
      name: dashboard.name || 'Your dashboard title',
      // dashbord.name
      activeId: '',
      currentTab: 'triggers',
      showDrawer: false
    };
  }

  // onNameChange = (e: React.FormEvent<HTMLElement>) => {
  //   const value = (e.currentTarget as HTMLButtonElement).value;
  //   this.setState({ dashboardName: value });
  // };

  // handleSubmit = () => {
  //   const { dashboardName } = this.state;
  //   const { save } = this.props;

  //   if (!dashboardName || dashboardName === 'Your dashboard title') {
  //     return Alert.error('Enter an Automation title');
  //   }

  //   const generateValues = () => {
  //     const finalValues = {
  //       _id: 'hellodarkness',
  //       dashboardName,
  //       status: 'draft',
  //     };
  //     return finalValues;
  //   };

  //   return save(generateValues());
  // };

  toggleDrawer = (type: string) => {
    this.setState({ showDrawer: !this.state.showDrawer, currentTab: type });
  };

  renderLeftActionBar() {
    const { name } = this.state;

    return (
      <CenterFlexRow>
        <Link to={`/dashboards`}>
          <BackButton>
            <Icon icon="angle-left" size={20} />
          </BackButton>
        </Link>
        <Title>
          <FormControl
            name="name"
            value={name}
            required={true}
            autoFocus={true}
            // onChange={this.onNameChange}
          />
          <Icon icon="edit-alt" size={16} />
        </Title>
      </CenterFlexRow>
    );
  }

  renderRightActionBar() {
    // const { isActive } = this.state;

    return (
      <BarItems>
        <ActionBarButtonsWrapper>
          {
            <Button
              btnStyle="primary"
              size="small"
              icon={'check-circle'}
              onClick={this.toggleDrawer.bind(this, 'triggers')}
            >
              Create a chart
            </Button>
          }
          <Button
            btnStyle="success"
            size="small"
            icon={'check-circle'}
            // onClick={this.handleSubmit}
          >
            {__('Save')}
          </Button>
        </ActionBarButtonsWrapper>
      </BarItems>
    );
  }
  renderTabContent() {
    return <ChartForm />;
  }

  render() {
    return (
      <>
        <HeightedWrapper>
          <AutomationFormContainer>
            <Wrapper.Header
              title={'Reports'}
              breadcrumb={[{ title: __('Reports'), link: '/reports' }]}
            />
            <PageContent
              actionBar={
                <Wrapper.ActionBar
                  left={this.renderLeftActionBar()}
                  right={this.renderRightActionBar()}
                />
              }
              transparent={false}
            ></PageContent>
          </AutomationFormContainer>

          <RTG.CSSTransition
            in={this.state.showDrawer}
            timeout={300}
            classNames="slide-in-right"
            unmountOnExit={true}
          >
            <RightDrawerContainer>
              {this.renderTabContent()}
            </RightDrawerContainer>
          </RTG.CSSTransition>
        </HeightedWrapper>
      </>
    );
  }
}

export default DashboardForm;
