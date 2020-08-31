import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Layout, Menu, Tabs } from 'antd';

import smallLogo from './images/small_logo.png';
import './App.css';

import { getAccessToken } from './utils/getCards';
import BattlegroundCardList from './components/cardlists/battlegrounds/BattlegroundCardList';
import StandardCardList from './components/cardlists/standard/StandardCardList';
import CardBackList from './components/cardlists/cardbacks/CardBackList';
import DeckBuilder from './components/deckBuilder/DeckBuilder';
import DeckReader from './components/deckReader/DeckReader';
import theme from './theme';

const { TabPane } = Tabs;
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const App: React.FC = () => {
	const [hasToken, setHasToken] = React.useState<boolean>(false);
	const [collapse, setCollapse] = React.useState<boolean>(false);
	const getToken = async () => {
		await getAccessToken();
		setHasToken(true);
	}

	React.useEffect(() => {
		getToken();
	}, []);

	const onCollapse = collapsed => {
		setCollapse(collapsed);
	};

	return (
		hasToken ?
			<Router>
				<Layout style={{ minHeight: '100vh', backgroundColor: theme.lightBrown }}>
					<Header style={{ position: 'fixed', zIndex: 1, width: '100%', backgroundColor: theme.darkBrown }}>
						{/* <img alt="Small Logo" src={smallLogo} width="64" height="64" style={{ textAlign: 'center' }} /> */}
						<Menu style={{ backgroundColor: theme.darkBrown, color: theme.primary }} defaultSelectedKeys={['1']} mode="horizontal">
							<SubMenu style={{ backgroundColor: theme.darkBrown, color: theme.primary }} key="sub1" title="Cards">
								<Menu.Item key="1">
									Standard & Wild Formats
									<Link to='/cards' />
								</Menu.Item>
								<Menu.Item key="2">
									Battlegrounds
									<Link to='/battlegrounds' />
								</Menu.Item>
								<Menu.Item key="3">
									Card backs
									<Link to='/cardbacks' />
								</Menu.Item>
							</SubMenu>
							<Menu.Item key="4">
								DeckBuilder
							<Link to='/deckbuilder' />
							</Menu.Item>
							<Menu.Item key="5">
								DeckReader
							<Link to='/deckreader' />
							</Menu.Item>
						</Menu>
					</Header>

					<Layout className="site-layout" style={{ backgroundColor: theme.lightBrown, color: theme.primary }}>
						<Content className="site-layout-background" style={{ padding: '100px 24px' }}>
							<Route exact path="/">
								<Redirect to="/cards" />
							</Route>
							<Route exact path='/cards' component={StandardCardList} />
							<Route exact path='/battlegrounds' component={BattlegroundCardList} />
							<Route exact path='/cardbacks' component={CardBackList} />
							<Route exact path='/deckbuilder' component={DeckBuilder} />
							<Route exact path='/deckreader' component={DeckReader} />
						</Content>
						<Footer style={{ textAlign: 'center', bottom: 0, position: 'fixed', width: '100%', backgroundColor: theme.darkBrown, color: theme.primary }}>Innkeeper ©2020 Created by Varga Máté</Footer>
					</Layout>
				</Layout>
			</Router>
			: null
	);
}

export default App;
