import React from 'react';
import { Layout, Input, List, Divider, Typography } from 'antd';
import { HeartStoneCard, Deck } from '../../types/types';
import { getDeck } from '../../utils/getCards';
import HeartStoneCardItem from '../cardlists/HeartstoneCard';

const { Search } = Input;
const { Title } = Typography;

const DeckReader: React.FC = () => {
    const [deck, setDeck] = React.useState<Deck | null>(null);

    const getDeckByDeckCode = React.useCallback(async (params) => {
        const result = await getDeck(params);
        if (result) setDeck(result);
    }, []);

    const onSearch = (query: string) => {
        getDeckByDeckCode(query);
    }

    return (
        <Layout>
            <Search
                placeholder="Enter a card name"
                onSearch={onSearch}
                allowClear
            ></Search>
            test deck code: AAECAQcG+wyd8AKS+AKggAOblAPanQMMS6IE/web8wLR9QKD+wKe+wKz/AL1gAOXlAOalAOSnwMA
            {deck ?
                <div>
                    <Divider orientation="left" plain>
                        <Title>Hero</Title>
                    </Divider>
                    <img alt={deck.hero.name} src={deck.hero.image} />

                    <Divider orientation="left" plain>
                        <Title>Cards</Title>
                    </Divider>
                    <List
                        grid={{ xs: 1, sm: 2, md: 3, lg: 4 }}
                        size="large"
                        dataSource={deck.cards}
                        renderItem={(card: HeartStoneCard) => (
                            <List.Item
                                key={card.id}
                            >
                                <HeartStoneCardItem
                                    card={card}
                                >
                                </HeartStoneCardItem>
                            </List.Item>
                        )}
                    />
                </div>
                : null
            }
        </Layout>
    )
}

export default DeckReader;
