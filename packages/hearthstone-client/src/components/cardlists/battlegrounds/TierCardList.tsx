import React from 'react';
import { Divider, List, Typography } from 'antd';
import { HeartStoneCard } from '../../../types/types';
import HeartStoneCardItem from '../HeartstoneCard';
import theme from '../../../theme';

const { Title } = Typography;

interface TierCardListProps {
    cards: HeartStoneCard[];
    tier: number;
}

const TierCardList: React.FC<TierCardListProps> = ({ cards, tier }) => {
    return (
        <div>
            <Divider orientation="left" plain>
                <Title style={{ color: theme.primary }}>
                    TIER {tier} Cards
                </Title>
            </Divider>
            <List
                grid={{ xs: 1, sm: 2, md: 3, lg: 4 }}
                size="large"
                dataSource={cards}
                renderItem={(card: HeartStoneCard) => (
                    <List.Item
                        key={card.id}
                    >
                        <HeartStoneCardItem
                            card={card}
                            isBattleGrounds={true}
                        >
                        </HeartStoneCardItem>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default TierCardList;
