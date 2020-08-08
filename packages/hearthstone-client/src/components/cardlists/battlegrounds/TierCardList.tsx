import React from 'react';
import { Divider, List, Typography } from 'antd';
import { HeartStoneCard, TierCardListProps } from '../../../types/types';

const { Title } = Typography;

const TierCardList: React.FC<TierCardListProps> = ({ cards, tier }) => {
    return (
        <div>
            <Divider orientation="left" plain>
                <Title>
                    TIER {tier} Cards
                </Title>
            </Divider>            <List
                grid={{ gutter: 16, column: 4 }}
                size="large"
                dataSource={cards}
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

export default TierCardList;
