import React from 'react';
import { List, Pagination, Layout } from 'antd';

import { getAllCards } from '../../../utils/getCards';
import { Cards, ListConfig, HeartStoneCard } from '../../../types/types';
import HeartStoneCardItem from '../HeartstoneCard';
import StandardCardListFilters from './StandardCardListFilters';

const StandardCardList: React.FC = () => {
    const [listConfig, setListConfig] = React.useState<ListConfig>({
        pageNumber: 1,
        pageSize: 16,
        sort: 'name',
        order: 'asc',
        optionalParams: {
            gameMode: 'constructed',
            class: 'all',
            set: '',
            rarity: '',
            type: ''
        }
    });
    const [cards, setCards] = React.useState<Cards | null>(null);
    const [showGoldsOnly, setShowGoldsOnly] = React.useState<boolean>(false);

    const getCards = React.useCallback(async (params) => {
        const result = await getAllCards(params);
        if (result) setCards(result);
    }, []);

    React.useEffect(() => {
        getCards(listConfig);
    }, [listConfig])

    const onPaginationChange = (page: number, pageSize: number = 16) => {
        setListConfig(prevState => ({
            ...prevState,
            pageNumber: page,
            pageSize: pageSize
        }));
    }

    return (
        <Layout>
            {cards ?
                <div>
                    <StandardCardListFilters
                        setListConfig={setListConfig}
                        setCards={setCards}
                        setShowGoldsOnly={setShowGoldsOnly}
                    ></StandardCardListFilters>
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
                                    showGoldsOnly={showGoldsOnly}
                                >
                                </HeartStoneCardItem>
                            </List.Item>
                        )}
                    />
                    <Pagination
                        defaultCurrent={listConfig.pageNumber}
                        total={cards.cardCount}
                        onChange={onPaginationChange}
                        defaultPageSize={16}
                        pageSizeOptions={['16', '32', '64']}
                    />
                </div>
                : null}
        </Layout>
    );
}

export default StandardCardList;
