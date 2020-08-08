import React from 'react';
import { Divider, List, Typography } from 'antd';
import { HeartStoneCard, HeroesListProps } from '../../../types/types';

const { Title } = Typography;

const HeroesList: React.FC<HeroesListProps> = ({ heroes }) => {
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
        </div>
    )
}

export default HeroesList;
