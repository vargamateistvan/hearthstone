import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Input, Select, Typography, Row, Col, Switch, Layout, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { getCard } from '../../../utils/getCards';
import { CardSet, CardClass, CardRarity, CardType } from '../../../types/types';
import theme from '../../../theme';

const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;

interface StandardCardListFiltersProps {
    setListConfig: Function;
    setCards: Function;
    setShowGoldsOnly: Function;
}

const CARD_PROPERTIES = gql`
    query getCardProperties {
        sets {
            name
            slug
        }
        classes{
            name
            slug
        }
        rarities {
            name
            slug
        }
        cardTypes {
            name
            slug
        }
    }
`;

const StandardCardListFilters: React.FC<StandardCardListFiltersProps> = ({ setListConfig, setCards, setShowGoldsOnly }) => {
    const { data } = useQuery(CARD_PROPERTIES);

    const getCardByText = React.useCallback(async (params) => {
        const result = await getCard(params);
        if (result) setCards(result);
    }, [setCards]);

    const onSortSelectChange = (order: string) => {
        setListConfig(prevState => ({
            ...prevState,
            order
        }));
    }

    const onSelectChange = (selected) => {
        const isSetChanged = data.sets.some(set => set.slug === selected);
        const isClassChanged = data.classes.some(cardClass => cardClass.slug === selected);
        const isRarityChanged = data.rarities.some(rarity => rarity.slug === selected);
        const isTypeChanged = data.cardTypes.some(type => type.slug === selected);

        if (isSetChanged) {
            setListConfig(prevState => ({
                ...prevState.optionalParams,
                optionalParams: {
                    ...prevState.optionalParams,
                    set: selected
                }
            }));
        }

        if (isClassChanged) {
            setListConfig(prevState => ({
                ...prevState.optionalParams,
                optionalParams: {
                    ...prevState.optionalParams,
                    class: selected
                }
            }));
        }

        if (isRarityChanged) {
            setListConfig(prevState => ({
                ...prevState,
                optionalParams: {
                    ...prevState.optionalParams,
                    rarity: selected
                }
            }));
        }

        if (isTypeChanged) {
            setListConfig(prevState => ({
                ...prevState.optionalParams,
                optionalParams: {
                    ...prevState.optionalParams,
                    type: selected
                }
            }));
        }
    }

    const resetFilter = () => {
        setListConfig(prevState => ({
            ...prevState.optionalParams,
            gameMode: '',
            class: 'all',
            set: 'set',
            rarity: 'rarity',
            type: ''
        }));
    }

    const onSearch = (query: string) => {
        getCardByText(query);
    }

    return (
        <Layout style={{ backgroundColor: theme.lightBrown, color: theme.primary }}>
            {data ?
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
                        {data.sets ?
                            <Col>
                                <Select
                                    defaultValue="Select a card set"
                                    onChange={onSelectChange}
                                    style={{ width: '250px' }}
                                >
                                    {data.sets.map((set: CardSet, index: number) => {
                                        return (
                                            <Option value={set.slug} key={index + 1}>{set.name}</Option>
                                        )
                                    })}
                                </Select>
                            </Col>
                            : null}
                        {data.classes ?
                            <Col>
                                <Select
                                    defaultValue="Select a card class"
                                    onChange={onSelectChange}
                                    style={{ width: '250px' }}
                                >
                                    {data.classes.map((cardClass: CardClass, index: number) => {
                                        return (
                                            <Option value={cardClass.slug} key={index} >{cardClass.name}</Option>
                                        )
                                    })}
                                </Select>
                            </Col>
                            : null}
                        {data.rarities ?
                            <Col>
                                <Select
                                    defaultValue="Select a card rarity"
                                    onChange={onSelectChange}
                                    style={{ width: '250px' }}
                                >
                                    {data.rarities.map((rarity: CardRarity, index: number) => {
                                        return (
                                            <Option value={rarity.slug} key={index} >{rarity.name}</Option>
                                        )
                                    })}
                                </Select>
                            </Col>
                            : null}
                        {data.cardTypes ?
                            <Col>
                                <Select
                                    defaultValue="Select a card type"
                                    onChange={onSelectChange}
                                    style={{ width: '250px' }}
                                >
                                    {data.cardTypes.map((type: CardType, index: number) => {
                                        return (
                                            <Option value={type.slug} key={index} >{type.name}</Option>
                                        )
                                    })}
                                </Select>
                            </Col>
                            : null}
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
                            <Switch onChange={(checked => setShowGoldsOnly(checked))} />
                        </Col>
                    </Row>
                </div>
                : null}
        </Layout>
    );
}

export default StandardCardListFilters;
