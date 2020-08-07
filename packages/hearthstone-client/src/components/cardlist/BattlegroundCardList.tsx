import React from 'react';
import { Divider, List, Typography } from 'antd';
import { HeartStoneCard, BattleGroundsCardListProps } from '../../types/types';

const { Title } = Typography;

const BattlegroundCardList: React.FC<BattleGroundsCardListProps> = ({ heroes, cards }) => {
    const getTierMinions = (tier: number) => {
        return cards
            .filter((card: HeartStoneCard) => card.battlegrounds.tier === tier)
    }

    return (
        <div>
            <Divider orientation="left" plain>
                <Title>
                    Heroes
                </Title>
            </Divider>
            <List
                grid={{ gutter: 16, column: 4 }}
                size="large"
                dataSource={heroes}
                renderItem={(hero: HeartStoneCard) => (
                    <List.Item
                        key={hero.id}
                    >
                        <img alt={hero.name} src={hero.image} />
                    </List.Item>
                )}
            />

            <Divider orientation="left" plain>
                <Title>
                    TIER 1 Cards
                </Title>
            </Divider>
            <List
                grid={{ gutter: 16, column: 4 }}
                size="large"
                dataSource={getTierMinions(1)}
                renderItem={(card: HeartStoneCard) => (
                    <List.Item
                        key={card.id}
                    >
                        <img alt={card.name} src={card.battlegrounds.image} />
                    </List.Item>
                )}
            />

            <Divider orientation="left" plain>
                <Title>
                    TIER 2 Cards
                </Title>
            </Divider>            <List
                grid={{ gutter: 16, column: 4 }}
                size="large"
                dataSource={getTierMinions(2)}
                renderItem={(card: HeartStoneCard) => (
                    <List.Item
                        key={card.id}
                    >
                        <img alt={card.name} src={card.battlegrounds.image} />
                    </List.Item>
                )}
            />

            <Divider orientation="left" plain>
                <Title>
                    TIER 3 Cards
                </Title>
            </Divider>            <List
                grid={{ gutter: 16, column: 4 }}
                size="large"
                dataSource={getTierMinions(3)}
                renderItem={(card: HeartStoneCard) => (
                    <List.Item
                        key={card.id}
                    >
                        <img alt={card.name} src={card.battlegrounds.image} />
                    </List.Item>
                )}
            />

            <Divider orientation="left" plain>
                <Title>
                    TIER 4 Cards
                </Title>
            </Divider>            <List
                grid={{ gutter: 16, column: 4 }}
                size="large"
                dataSource={getTierMinions(4)}
                renderItem={(card: HeartStoneCard) => (
                    <List.Item
                        key={card.id}
                    >
                        <img alt={card.name} src={card.battlegrounds.image} />
                    </List.Item>
                )}
            />

            <Divider orientation="left" plain>
                <Title>
                    TIER 5 Cards
                </Title>
            </Divider>            <List
                grid={{ gutter: 16, column: 4 }}
                size="large"
                dataSource={getTierMinions(5)}
                renderItem={(card: HeartStoneCard) => (
                    <List.Item
                        key={card.id}
                    >
                        <img alt={card.name} src={card.battlegrounds.image} />
                    </List.Item>
                )}
            />

            <Divider orientation="left" plain>
                <Title>
                    TIER 6 Cards
                </Title>
            </Divider>            <List
                grid={{ gutter: 16, column: 4 }}
                size="large"
                dataSource={getTierMinions(6)}
                renderItem={(card: HeartStoneCard) => (
                    <List.Item
                        key={card.id}
                    >
                        <img alt={card.name} src={card.battlegrounds.image} />
                    </List.Item>
                )}
            />
        </div>
    )
}

export default BattlegroundCardList;
