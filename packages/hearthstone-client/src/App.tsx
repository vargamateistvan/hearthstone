import React from 'react';
import { Layout, Menu, Col, Row, } from 'antd';

import smallLogo from './images/small_logo.png';
import './App.css';

import { MENU } from './enums';
import BattlegroundCardList from './components/cardlists/battlegrounds/BattlegroundCardList';
import StandardCardList from './components/cardlists/standard/StandardCardList';
import CardBackList from './components/cardlists/cardbacks/CardBackList';

const { Header, Content } = Layout;

const App: React.FC = () => {
  const [menuItem, setMenuItem] = React.useState<string | ''>('constructed');

  const menu = Object.values(MENU);

  const menuItemChange = (menuItem) => {
    setMenuItem(menuItem);
  }

  return (
    <Layout>
      <Header className="header">
        <Row>
          <Col flex="100px">
            <img alt="Small Logo" src={smallLogo} width="64" height="64" />
          </Col>
          <Col flex="auto">
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
              {menu.map((item: string, index: number) => {
                return (
                  <Menu.Item onClick={() => menuItemChange(item)} key={index}>{item === MENU.STANDARD ? 'STANDARD CARDS' : item.toUpperCase()}</Menu.Item>
                )
              })}
            </Menu>
          </Col>
        </Row>
      </Header>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content

          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {menuItem === MENU.STANDARD ?
            <StandardCardList></StandardCardList> :
            menuItem === MENU.BATTLEGROUNDS ?
              <BattlegroundCardList></BattlegroundCardList> :
              <CardBackList></CardBackList>
          }
        </Content>
      </Layout>
    </Layout >
  );
}

export default App;
