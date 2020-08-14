import React from 'react';
import { Divider, List, Typography } from 'antd';
import { HeartStoneCard } from '../../../types/types';
import HeartStoneCardItem from '../HeartstoneCard';

const { Title } = Typography;

interface HeroesListProps {
    heroes: HeartStoneCard[];
}

const HeroesList: React.FC<HeroesListProps> = ({ heroes }) => {
    return (
        <div>
            <Divider orientation="left" plain>
                <Title>
                    Heroes
                </Title>
            </Divider>
            <List
                grid={{ xs: 1, sm: 2, md: 3, lg: 4 }}
                size="large"
                dataSource={heroes}
                renderItem={(hero: HeartStoneCard) => (
                    <List.Item
                        key={hero.id}
                    >
                        <HeartStoneCardItem
                            card={hero}
                            isBattleGrounds={true}
                        >
                        </HeartStoneCardItem>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default HeroesList;
