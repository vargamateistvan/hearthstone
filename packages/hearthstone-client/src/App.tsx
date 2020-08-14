import React from 'react';
import { Layout, Tabs } from 'antd';

import smallLogo from './images/small_logo.png';
import './App.css';

import BattlegroundCardList from './components/cardlists/battlegrounds/BattlegroundCardList';
import StandardCardList from './components/cardlists/standard/StandardCardList';
import CardBackList from './components/cardlists/cardbacks/CardBackList';
import DeckBuilder from './components/deckBuilder/DeckBuilder';
import { getAccessToken } from './utils/getCards';
import DeckReader from './components/deckReader/DeckReader';

const { TabPane } = Tabs;

const App: React.FC = () => {
	const [hasToken, setHasToken] = React.useState<boolean>(false);
	const getToken = async () => {
		await getAccessToken();
		setHasToken(true);
	}

	React.useEffect(() => {
		getToken();
	}, []);

	return (
		hasToken ?
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
					<TabPane tab="Deck builder" key="4">
						<DeckBuilder></DeckBuilder>
					</TabPane>
					<TabPane tab="Deck reader" key="5">
						<DeckReader></DeckReader>
					</TabPane>
				</Tabs>
			</Layout>
			: null
	);
}

export default App;
