import React from 'react';
import { Layout } from 'antd';

import PrivateSider from './PrivateSider';

const { Header, Content, Footer } = Layout;

class PrivateLayout extends React.Component {

  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
        </Header>
        <Layout>
          <PrivateSider />
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }} >
              <div>
                { this.props.children }
              </div>
            </Content>
          </Layout>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>
          Copyright© 2017 Jarck, Inc.
        </Footer>
      </Layout>
    );
  }
}

export default PrivateLayout;
