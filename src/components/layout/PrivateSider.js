import React from 'react';
import { Layout, Menu, Icon, Switch } from 'antd';
import { Link, withRouter } from 'react-router-dom';

const SubMenu = Menu.SubMenu;
const { Sider } = Layout;

class PrivateSider extends React.Component {
  state = {
    theme: 'light',
    collapsed: false,
  }

  changeTheme = (value) => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  }

  changeToggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    let displayable = this.state.collapsed ? 'none' : 'inline-block';

    return (
      <Sider
        trigger={ null }
        collapsible
        collapsed={ this.state.collapsed }
        width={200}
        style={{ background: '#fff' }}>
        <br />
        <Icon
          className="trigger"
          type={ this.state.collapsed ? 'menu-unfold' : 'menu-fold' }
          onClick={ this.changeToggle } />
        <span className="ant-divider" style={{ margin: '0 1em', display: displayable }} />
        <Switch onChange={ this.changeTheme } style={{ display: displayable }} /> 主题
        <br />
        <Menu
          theme={ this.state.theme }
          style={{ height: '100%', borderRight: 0 }}
          defaultOpenKeys={['chart']}
          selectedKeys={[ this.state.current ]}
          mode="inline">
          <SubMenu key="chart" title={ <span><Icon type="dot-chart" /><span>基础信息</span></span> }>
            <Menu.Item key="1">
              <Link exact to={'/companies'}>公司信息</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="user" title={ <span><Icon type="user" />帐号</span> } >
            <Menu.Item key="2">
              <span>个人信息</span>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(PrivateSider);
