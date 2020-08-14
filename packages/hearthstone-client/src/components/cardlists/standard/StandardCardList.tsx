import React from 'react';
import { List, Pagination, Input, Select, Typography, Row, Col, Switch } from 'antd';

import { getAllCards, getCard } from '../../../utils/getCards';
import { Cards, ListConfig, HeartStoneCard } from '../../../types/types';
import { CARD_CLASSES, CARD_SETS } from '../../../enums';
import HeartStoneCardItem from '../HeartstoneCard';

const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;

const pageConfig = {
    pageNumber: 1,
    pageSize: 16,
    sort: 'name',
    order: 'asc',
    optionalParams: {
        cardClass: 'all',
        cardSet: '',
        gameMode: 'constructed'
    }
}

const StandardCardList: React.FC = () => {
    const [listConfig, setListConfig] = React.useState<ListConfig>(pageConfig);
    const [cards, setCards] = React.useState<Cards | null>(null);
    const [showGoldsOnly, setShowGoldsOnly] = React.useState<boolean>(false);

    const getCards = React.useCallback(async (params) => {
        const result = await getAllCards(params);
        if (result) setCards(result);
    }, []);

    const getCardByText = React.useCallback(async (params) => {
        const result = await getCard(params);
        if (result) {
            setCards(result);
        }
    }, []);

    React.useEffect(() => {
        setListConfig(pageConfig);
        getCards(listConfig);
    }, [getCards, listConfig])

    const cardClasses = Object.values(CARD_CLASSES);
    const cardSets = Object.values(CARD_SETS);

    const onSortSelectChange = (order: string) => {
        pageConfig.order = order;
        setListConfig(pageConfig);
        getCards(listConfig);
    }

    const onClassSelectChange = (cardClass: string) => {
        pageConfig.optionalParams.cardClass = cardClass;
        setListConfig(pageConfig);
        getCards(listConfig);
    }

    const onSetsSelectChange = (cardSet: string) => {
        pageConfig.optionalParams.cardSet = cardSet;
        setListConfig(pageConfig);
        getCards(listConfig);
    }

    const onShowGoldsOnly = (checked: boolean) => {
        setShowGoldsOnly(checked);
    }

    const onPaginationChange = (page: number, pageSize: number = 16) => {
        pageConfig.pageNumber = page;
        pageConfig.pageSize = pageSize;
        setListConfig(pageConfig);
        getCards(listConfig)
    }

    const onSearch = (query: string) => {
        getCardByText(query);
    }

    return (
        <div>
            {cards ?
                <div>
                    <Row>
                        <Col flex={7}>
                            <Search
                                placeholder="Enter a card name"
                                onSearch={onSearch}
                                allowClear
                            ></Search>
                        </Col>
                        <Col flex={5}>
                            <Select
                                defaultValue="all"
                                onChange={onSetsSelectChange}
                                style={{ width: '250px' }}
                            >
                                {cardSets.map((cardSet: string, index: number) => {
                                    return (
                                        <Option value={cardSet} key={index + 1}>{cardSet.toUpperCase()}</Option>
                                    )
                                })}
                            </Select>
                        </Col>
                        <Col flex={5}>
                            <Select
                                defaultValue="all"
                                onChange={onClassSelectChange}
                                style={{ width: '250px' }}
                            >
                                {cardClasses.map((cardClass: string, index: number) => {
                                    return (
                                        <Option value={cardClass} key={index} >{cardClass.toUpperCase()}</Option>
                                    )
                                })}
                            </Select>
                        </Col>
                        <Col flex={4}>
                            <Select
                                defaultValue="asc"
                                onChange={onSortSelectChange}
                            >
                                <Option value="asc">Card name: A - Z</Option>
                                <Option value="desc">Card name: Z - A</Option>
                                <Option value="manaCost">Mana cost</Option>
                            </Select>
                        </Col>
                        <Col flex={2}>
                            <Text>Show golds</Text>
                            <Switch onChange={onShowGoldsOnly} />
                        </Col>
                    </Row>
                    <List
                        grid={{ gutter: 16, column: 4 }}
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
                        defaultCurrent={pageConfig.pageNumber}
                        total={cards.cardCount}
                        onChange={onPaginationChange}
                        pageSize={16}
                        pageSizeOptions={['16', '32', '64']}
                    />
                </div>
                : null}
        </div>
    );
}

export default StandardCardList;
