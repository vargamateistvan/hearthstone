import React from 'react';
import { List, Avatar, Pagination, Input } from 'antd';

import { getAllCards, getCard } from '../../utils/getCards';
import { Cards, Card } from '../../types';

const { Search } = Input;

const pageConfig = {
    pageNumber: 1,
    pageSize: 16,
    sort: 'name',
    order: 'desc'
}

const CardList: React.FC = () => {
    const [cards, setCards] = React.useState<Cards | null>(null);

    const getCards = React.useCallback(async (params) => {
        const result = await getAllCards(params);
        if (result) {
            setCards(result);
        }
    }, [])

    React.useEffect(() => {
        getCards(pageConfig)
    }, [])

    const onChange = (page: number) => {
        pageConfig.pageNumber = page;
        getCards(pageConfig)
    }

    const onShowSizeChange = (size: number) => {
        pageConfig.pageSize = size;
        getCards(pageConfig)
    }

    const onSearch = (query: string) => {
        getCard(query);
    }

    return (
        cards ?
            <div>
                <Search
                    placeholder="Enter a card name"
                    onSearch={onSearch}
                    size="large"
                ></Search>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    size="large"
                    dataSource={cards.cards}
                    renderItem={(item: Card) => (
                        <List.Item
                            key={item.id}
                        >
                            <img src={item.image} />
                        </List.Item>
                    )}
                />
                <Pagination
                    defaultCurrent={pageConfig.pageNumber}
                    total={cards.cardCount}
                    onChange={onChange}
                    onShowSizeChange={onShowSizeChange}
                />
            </div>
            : null
    );
}

export default CardList;
