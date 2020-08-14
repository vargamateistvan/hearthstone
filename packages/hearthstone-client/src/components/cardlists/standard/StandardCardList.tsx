import React from 'react';
import { List, Pagination, Input, Select, Typography, Row, Col, Switch, Layout, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { getAllCards, getCard, getSets, getClasses, getRarities, getTypes } from '../../../utils/getCards';
import { Cards, ListConfig, HeartStoneCard, CardSet, CardClass, CardRarity, CardType } from '../../../types/types';
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
        gameMode: 'constructed',
        class: 'all',
        set: '',
        rarity: '',
        type: ''
    }
}

const StandardCardList: React.FC = () => {
    const [listConfig, setListConfig] = React.useState<ListConfig>(pageConfig);
    const [cards, setCards] = React.useState<Cards | null>(null);
    const [showGoldsOnly, setShowGoldsOnly] = React.useState<boolean>(false);
    const [cardSets, setCardSets] = React.useState<CardSet[]>([])
    const [cardClasses, setCardClasses] = React.useState<CardClass[]>([])
    const [cardRarities, setCardRarities] = React.useState<CardRarity[]>([])
    const [cardTypes, setCardTypes] = React.useState<CardType[]>([])

    const getCards = React.useCallback(async (params) => {
        const result = await getAllCards(params);
        if (result) setCards(result);
    }, []);

    const getCardByText = React.useCallback(async (params) => {
        const result = await getCard(params);
        if (result) setCards(result);
    }, []);

    React.useEffect(() => {
        setListConfig(pageConfig);
        getCards(listConfig);
    }, [getCards, listConfig])

    const getCardSets = React.useCallback(async () => {
        const result = await getSets();
        if (result) setCardSets(result);
    }, []);

    const getCardClasses = React.useCallback(async () => {
        const result = await getClasses();
        if (result) setCardClasses(result);
    }, []);

    const getCardRarities = React.useCallback(async () => {
        const result = await getRarities();
        if (result) setCardRarities(result);
    }, []);

    const getCardTypes = React.useCallback(async () => {
        const result = await getTypes();
        if (result) setCardTypes(result);
    }, []);

    React.useEffect(() => {
        getCardSets();
        getCardClasses();
        getCardRarities();
        getCardTypes();
    }, [getCardSets, getCardClasses, getCardRarities, getCardTypes])

    const onSortSelectChange = (order: string) => {
        pageConfig.order = order;
        setListConfig(pageConfig);
        getCards(listConfig);
    }

    const onSelectChange = (selected) => {
        const isSetChanged = cardSets.some(set => set.slug === selected);
        const isClassChanged = cardClasses.some(cardClass => cardClass.slug === selected);
        const isRarityChanged = cardRarities.some(rarity => rarity.slug === selected);
        const isTypeChanged = cardTypes.some(type => type.slug === selected);

        if (isSetChanged) {
            pageConfig.optionalParams.set = selected;
        }

        if (isClassChanged) {
            pageConfig.optionalParams.class = selected;
        }

        if (isRarityChanged) {
            pageConfig.optionalParams.rarity = selected;
        }

        if (isTypeChanged) {
            pageConfig.optionalParams.type = selected;
        }

        setListConfig(pageConfig);
        getCards(listConfig);
    }

    const resetFilter = () => {
        pageConfig.optionalParams.gameMode = 'constructed';
        pageConfig.optionalParams.class = 'all';
        pageConfig.optionalParams.set = '';
        pageConfig.optionalParams.rarity = '';
        pageConfig.optionalParams.type = '';

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
        <Layout>
            {cards ?
                <div>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col>
                            <Search
                                placeholder="Enter a card name"
                                onSearch={onSearch}
                                allowClear
                            ></Search>
                        </Col>
                        <Col >
                            <Button type="dashed" onClick={resetFilter} icon={<CloseOutlined />}>Reset Filters</Button>
                        </Col>
                    </Row>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col>
                            <Select
                                defaultValue="Select a card set"
                                onChange={onSelectChange}
                                style={{ width: '250px' }}
                            >
                                {cardSets.map((set: CardSet, index: number) => {
                                    return (
                                        <Option value={set.slug} key={index + 1}>{set.name}</Option>
                                    )
                                })}
                            </Select>
                        </Col>
                        <Col>
                            <Select
                                defaultValue="Select a card class"
                                onChange={onSelectChange}
                                style={{ width: '250px' }}
                            >
                                {cardClasses.map((cardClass: CardClass, index: number) => {
                                    return (
                                        <Option value={cardClass.slug} key={index} >{cardClass.name}</Option>
                                    )
                                })}
                            </Select>
                        </Col>
                        <Col>
                            <Select
                                defaultValue="Select a card rarity"
                                onChange={onSelectChange}
                                style={{ width: '250px' }}
                            >
                                {cardRarities.map((rarity: CardRarity, index: number) => {
                                    return (
                                        <Option value={rarity.slug} key={index} >{rarity.name}</Option>
                                    )
                                })}
                            </Select>
                        </Col>
                        <Col>
                            <Select
                                defaultValue="Select a card type"
                                onChange={onSelectChange}
                                style={{ width: '250px' }}
                            >
                                {cardTypes.map((type: CardType, index: number) => {
                                    return (
                                        <Option value={type.slug} key={index} >{type.name}</Option>
                                    )
                                })}
                            </Select>
                        </Col>
                        <Col>
                            <Select
                                defaultValue="asc"
                                onChange={onSortSelectChange}
                            >
                                <Option value="asc">Card name: A - Z</Option>
                                <Option value="desc">Card name: Z - A</Option>
                                <Option value="manaCost">Mana cost</Option>
                            </Select>
                        </Col>
                        <Col>
                            <Text>Show golds</Text>
                            <Switch onChange={onShowGoldsOnly} />
                        </Col>
                    </Row>
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
                        defaultCurrent={pageConfig.pageNumber}
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
