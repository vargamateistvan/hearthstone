import React from 'react';
import { Layout, Tabs } from 'antd';

import smallLogo from './images/small_logo.png';
import './App.css';

import BattlegroundCardList from './components/cardlists/battlegrounds/BattlegroundCardList';
import StandardCardList from './components/cardlists/standard/StandardCardList';
import CardBackList from './components/cardlists/cardbacks/CardBackList';
// import { GameMode } from './types/types';
// import { getGameModes } from './utils/getCards';

const { TabPane } = Tabs;

const App: React.FC = () => {
	// const [gameModes, setGameMode] = React.useState<GameMode[]>([])

	// const getModes = React.useCallback(async () => {
	// 	const result = await getGameModes();
	// 	if (result) setGameMode(result);
	// }, []);

	// React.useEffect(() => {
	// 	getModes();
	// }, [getModes])

	return (
		<Layout style={{ padding: '0 24px 24px' }}>
			<Tabs type="card" defaultActiveKey="1" style={{ marginBottom: 32 }}>
				<TabPane tab={
					<div>
						<img alt="Small Logo" src={smallLogo} width="64" height="64" />
						Standard & Wild Formats
					</div>
				} key="1">
					<StandardCardList></StandardCardList>
				</TabPane>
				<TabPane tab="Battlegrounds" key="2">
					<BattlegroundCardList></BattlegroundCardList>
				</TabPane>
				<TabPane tab="Card backs" key="3">
					<CardBackList></CardBackList>
				</TabPane>
			</Tabs>
		</Layout>
	);
}

export default App;
