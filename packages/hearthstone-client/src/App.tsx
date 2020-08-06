import React from 'react';
import { Layout, Menu, } from 'antd';

import smallLogo from './images/small_logo.png';
import './App.css';

import CardList from './components/cardlist/CardList';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const App: React.FC = () => {
  const [cardClass, setCardClass] = React.useState<string | ''>('');
  const [cardSet, setCardSet] = React.useState<string | ''>('');

  return (
    <Layout>
      <Header className="header">
        <div className="logo" >
          <img alt="Small Logo" src={smallLogo} width="32" height="32" />
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Standard Card</Menu.Item>
          <Menu.Item key="2">Wild Card</Menu.Item>
          <Menu.Item key="3">Battleground</Menu.Item>
        </Menu>
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
              <Menu.Item onClick={() => setCardClass('all')} key="1">All</Menu.Item>
              <Menu.Item onClick={() => setCardClass('demonhunter')} key="2">Demon Hunter</Menu.Item>
              <Menu.Item onClick={() => setCardClass('druid')} key="3">Druid</Menu.Item>
              <Menu.Item onClick={() => setCardClass('hunter')} key="4">Hunter</Menu.Item>
              <Menu.Item onClick={() => setCardClass('mage')} key="5">Mage</Menu.Item>
              <Menu.Item onClick={() => setCardClass('paladin')} key="6">Paladin</Menu.Item>
              <Menu.Item onClick={() => setCardClass('priest')} key="7">Priest</Menu.Item>
              <Menu.Item onClick={() => setCardClass('rogue')} key="8">Rouge</Menu.Item>
              <Menu.Item onClick={() => setCardClass('shaman')} key="9">Shaman</Menu.Item>
              <Menu.Item onClick={() => setCardClass('warlock')} key="10">Warlock</Menu.Item>
              <Menu.Item onClick={() => setCardClass('warrior')} key="11">Warrior</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title="Card Sets">
              <Menu.Item onClick={() => setCardSet('scholomance-academy')} key="12">Scholomance Academy</Menu.Item>
              <Menu.Item onClick={() => setCardSet('ashes-of-outlands')} key="13">Ashes of Outlands</Menu.Item>
              <Menu.Item onClick={() => setCardSet('descent-of-dragons')} key="14">Descent of Dragons</Menu.Item>
              <Menu.Item onClick={() => setCardSet('saviors-of-uldum')} key="15">Saviors of Uldum</Menu.Item>
              <Menu.Item onClick={() => setCardSet('rise-of-shadows')} key="16">Rise of Shadows</Menu.Item>
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
            <CardList
              cardClass={cardClass}
              cardSet={cardSet}
            ></CardList>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
