import React from 'react';
import { Layout, Menu, Col, Row, } from 'antd';

import smallLogo from './images/small_logo.png';
import './App.css';

import { GAMEMODES } from './types/enums';
import BattlegroundCardList from './components/cardlists/battlegrounds/BattlegroundCardList';
import StandardCardList from './components/cardlists/standard/StandardCardList';

const { Header, Content } = Layout;

const App: React.FC = () => {
  const [gameMode, setGameMode] = React.useState<string | ''>('constructed');

  const gameModes = Object.values(GAMEMODES);

  const gameModeChange = (gameMode) => {
    setGameMode(gameMode);
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
              {gameModes.map((gameMode: string, index: number) => {
                return (
                  <Menu.Item onClick={() => gameModeChange(gameMode)} key={index}>{gameMode === GAMEMODES.STANDARD ? 'Standard Card' : gameMode.toUpperCase()}</Menu.Item>
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
          {gameMode === GAMEMODES.STANDARD ?
            <StandardCardList></StandardCardList>
            : <BattlegroundCardList></BattlegroundCardList>
          }
        </Content>
      </Layout>
    </Layout >
  );
}

export default App;
