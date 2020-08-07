import React from 'react';
import { Layout, Menu, } from 'antd';

import smallLogo from './images/small_logo.png';
import './App.css';

import CardList from './components/cardlist/CardList';
import { CARDSETS, GAMEMODES } from './types/enums';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const App: React.FC = () => {
  const [cardSet, setCardSet] = React.useState<string | ''>('');
  const [gameMode, setGameMode] = React.useState<string | ''>('');

  const cardSets = Object.values(CARDSETS);
  const gameModes = Object.values(GAMEMODES);

  const gameModeChange = (gameMode) => {
    setGameMode(gameMode);
    setCardSet('');
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        {/* <img alt="Small Logo" src={smallLogo} width="32" height="32" /> */}
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
          {gameModes.map((gameMode: string, index: number) => {
            return (
              <Menu.Item onClick={() => gameModeChange(gameMode)} key={index}>{gameMode === GAMEMODES.STANDARD ? 'Standard Card' : gameMode.toUpperCase()}</Menu.Item>
            )
          })}
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultOpenKeys={['sub1']}
            theme="dark"
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu key="sub1" title="Card Sets">
              {cardSets.map((cardSet: string, index: number) => {
                return (
                  <Menu.Item onClick={() => setCardSet(cardSet)} key={index + 1}>{cardSet.toUpperCase()}</Menu.Item>
                )
              })}
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <CardList
              cardSet={cardSet}
              gameMode={gameMode}
            ></CardList>
          </Content>
        </Layout>
      </Layout>
    </Layout >
  );
}

export default App;
