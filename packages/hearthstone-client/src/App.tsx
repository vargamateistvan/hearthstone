import React from 'react';
import { Layout, Menu, } from 'antd';

// import smallLogo from './images/small_logo.png';
import './App.css';

import CardList from './components/cardlist/CardList';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const App: React.FC = () => {
  return (
    <Layout>
      <Header className="header">
        <div className="logo" >
          {/* <img src={smallLogo} width="32" height="32" /> */}
        </div>
        {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu> */}
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu key="sub1" title="Class Cards">
              <Menu.Item key="1">Demon Hunter</Menu.Item>
              <Menu.Item key="2">Druid</Menu.Item>
              <Menu.Item key="3">Hunter</Menu.Item>
              <Menu.Item key="4">Mage</Menu.Item>
              <Menu.Item key="5">Paladin</Menu.Item>
              <Menu.Item key="6">Priest</Menu.Item>
              <Menu.Item key="7">Rouge</Menu.Item>
              <Menu.Item key="8">Shaman</Menu.Item>
              <Menu.Item key="9">Warlock</Menu.Item>
              <Menu.Item key="10">Warrior</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title="Card Sets">
              <Menu.Item key="11">Scholomance Academy</Menu.Item>
              <Menu.Item key="12">Ashes of Outlands</Menu.Item>
              <Menu.Item key="13">Descent of Dragons</Menu.Item>
              <Menu.Item key="14">Saviors of Uldum</Menu.Item>
              <Menu.Item key="15">Rise of Shadows</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <CardList></CardList>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
