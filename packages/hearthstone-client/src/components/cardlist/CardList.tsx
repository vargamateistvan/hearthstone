import React from 'react';
import { List, Modal, Pagination, Input, Select, Typography, Row, Col, Switch } from 'antd';

import { getAllCards, getCard } from '../../utils/getCards';
import { Cards, HeartStoneCard, ListConfig, CardListProps } from '../../types/types';
import ViewCardModal from './CardModal';
import { CARDCLASSES } from '../../types/enums';

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

const CardList: React.FC<CardListProps> = ({ cardSet, gameMode }) => {
    const [listConfig, setListConfig] = React.useState<ListConfig>(pageConfig);
    const [cards, setCards] = React.useState<Cards | null>(null);
    const [showCard, setShowCard] = React.useState<boolean>(false);
    const [currentCard, setCurrentCard] = React.useState<HeartStoneCard | null>(null);
    const [showGoldsOnly, setShowGoldsOnly] = React.useState<boolean>(false);

    const getCards = React.useCallback(async (params) => {
        const result = await getAllCards(params);
        if (result) {
            setCards(result);
        }
    }, []);

    if (cardSet !== pageConfig.optionalParams.cardSet
        || gameMode !== pageConfig.optionalParams.gameMode) {
        pageConfig.optionalParams.cardSet = cardSet;
        pageConfig.optionalParams.gameMode = gameMode;
        setListConfig(pageConfig);
        getCards(listConfig);
    }

    React.useEffect(() => {
        setListConfig(pageConfig);
        getCards(listConfig);
    }, [getCards, listConfig, pageConfig])

    const cardClasses = Object.values(CARDCLASSES);

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
        getCard(query);
    }

    const onShowCard = (card: HeartStoneCard) => {
        setCurrentCard(card)
        setShowCard(true);
    }

    return (
        cards ?
            <div>
                <Search
                    placeholder="Enter a card name"
                    onSearch={onSearch}
                    size="middle"
                ></Search>
                <Row>
                    <Col span={6}>
                        <Select
                            defaultValue="all"
                            size="large"
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
                    <Col span={6}>
                        {/* <Text>Sort by</Text> */}
                        <Select
                            defaultValue="asc"
                            size="large"
                            onChange={onSortSelectChange}
                        >
                            <Option value="asc">Card name: A - Z</Option>
                            <Option value="desc">Card name: Z - A</Option>
                        </Select>
                    </Col>
                    <Col span={6}>
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
                            onClick={() => onShowCard(card)}
                        >
                            <img alt={card.name} src={showGoldsOnly && card.imageGold ? card.imageGold : card.image} />
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
                {currentCard ?
                    <Modal
                        visible={showCard}
                        centered
                        onOk={() => setShowCard(false)}
                        onCancel={() => setShowCard(false)}
                    >
                        <ViewCardModal
                            artistName={currentCard.artistName}
                            attack={currentCard.attack}
                            cardSetId={currentCard.cardSetId}
                            cardTypeId={currentCard.cardTypeId}
                            classId={currentCard.classId}
                            collectible={currentCard.collectible}
                            cropImage={currentCard.cropImage}
                            flavorText={currentCard.flavorText}
                            health={currentCard.health}
                            id={currentCard.id}
                            image={currentCard.image}
                            imageGold={currentCard.imageGold}
                            keywordIds={currentCard.keywordIds}
                            manaCost={currentCard.manaCost}
                            minionTypeId={currentCard.minionTypeId}
                            multiClassIds={currentCard.multiClassIds}
                            name={currentCard.name}
                            rarityId={currentCard.rarityId}
                            slug={currentCard.slug}
                            text={currentCard.text}
                        ></ViewCardModal>
                    </Modal> : null}
            </div>
            : null
    );
}

export default CardList;
