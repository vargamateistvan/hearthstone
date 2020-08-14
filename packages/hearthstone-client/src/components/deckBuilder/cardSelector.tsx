import React from 'react';
import { Layout, List } from 'antd';
import { CardClass, Cards, ListConfig, HeartStoneCard } from '../../types/types';
import { getAllCards } from '../../utils/getCards';
import HeartStoneCardItem from '../cardlists/HeartstoneCard';

const pageConfig = {
    pageSize: 1000,
    sort: 'manacost',
    order: 'asc',
    optionalParams: {
        gameMode: 'constructed',
        class: '',
        set: '',
    }
}

interface CardSelectorProps {
    selectedType: string | null;
    selectedClass: CardClass | null;
    setDeck: Function;
}

const CardSelector: React.FC<CardSelectorProps> = ({ selectedType, selectedClass, setDeck }) => {
    const [listConfig, setListConfig] = React.useState<ListConfig>(pageConfig);
    const [cards, setCards] = React.useState<Cards | null>(null);

    const getCards = React.useCallback(async (params) => {
        const result = await getAllCards(params);
        if (result) setCards(result);
    }, []);

    React.useEffect(() => {
        pageConfig.optionalParams.class = selectedClass ? selectedClass.slug : '';
        pageConfig.optionalParams.set = selectedType ? selectedType : '';
        setListConfig(pageConfig);
        getCards(listConfig);
    }, [getCards, listConfig, selectedType, selectedClass])

    return (
        <Layout>
            {cards ?
                <List
                    grid={{ xs: 1, sm: 2, md: 3, lg: 4 }}
                    size="large"
                    dataSource={cards.cards}
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
                : null}
        </Layout>
    )
}

export default CardSelector;
