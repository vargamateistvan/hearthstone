import React from 'react';
import { List, Modal, Pagination, Input, Select, Typography, Row, Col, Switch } from 'antd';

import { getAllCards, getCard } from '../../../utils/getCards';
import { Cards, ListConfig, HeartStoneCard } from '../../../types/types';
import { CARDCLASSES, CARDSETS } from '../../../types/enums';
import ViewCardModal from '../CardModal';
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
    const [showCard, setShowCard] = React.useState<boolean>(false);
    const [currentCard, setCurrentCard] = React.useState<HeartStoneCard | null>(null);
    const [showGoldsOnly, setShowGoldsOnly] = React.useState<boolean>(false);

    const getCards = React.useCallback(async (params) => {
        const result = await getAllCards(params);
        if (result) {
            setCards(result);
        }
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

    const cardClasses = Object.values(CARDCLASSES);
    const cardSets = Object.values(CARDSETS);

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

    const onShowCard = (card: HeartStoneCard) => {
        setCurrentCard(card)
        setShowCard(true);
    }

    return (
        <div>
            <Search
                placeholder="Enter a card name"
                onSearch={onSearch}
                size="middle"
            ></Search>
            {cards ?
                <div>
                    <Row>
                        <Col span={6}>
                            <Select
                                defaultValue="all"
                                size="large"
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
                            <Select
                                defaultValue="asc"
                                size="large"
                                onChange={onSortSelectChange}
                            >
                                <Option value="asc">Card name: A - Z</Option>
                                <Option value="desc">Card name: Z - A</Option>
                                <Option value="manaCost">Mana cost</Option>
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
                        battlegrounds={currentCard.battlegrounds}
                    ></ViewCardModal>
                </Modal> : null}
        </div>
    );
}

export default StandardCardList;
