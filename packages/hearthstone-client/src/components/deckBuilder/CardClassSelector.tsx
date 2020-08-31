import React from 'react';
import { List, Layout, Divider, Typography } from 'antd';
import { CardClass, HeartStoneCard } from '../../types/types';
import { getClasses, getHeroes } from '../../utils/getCards';
import theme from '../../theme';

const { Title } = Typography;

interface CardSelectorProps {
    setSelectedClass: Function;
}

const CardClassSelector: React.FC<CardSelectorProps> = ({ setSelectedClass }) => {
    const [cardClasses, setCardClasses] = React.useState<CardClass[]>([])
    const [heroes, setHeroes] = React.useState<HeartStoneCard[] | null>(null)

    const getCardClasses = React.useCallback(async () => {
        const result = await getClasses();
        if (result) setCardClasses(result);
    }, []);

    const getHeroesCards = React.useCallback(async () => {
        const result = await getHeroes();
        if (result) setHeroes(result.cards);
    }, []);

    React.useEffect(() => {
        getCardClasses();
        getHeroesCards();
    }, [getCardClasses, getHeroesCards])

    const getClassHeroes = (classId: number) => {
        if (!heroes) return;
        return heroes.filter((hero: HeartStoneCard) => hero.classId === classId);
    }

    return (
        <Layout style={{ backgroundColor: theme.lightBrown, color: theme.primary }}>
            {heroes ?
                <div>
                    {cardClasses.map((cardClass: CardClass) => {
                        return (
                            cardClass.slug !== 'neutral' ?
                                <div>
                                    <Divider orientation="left" plain>
                                        <Title>
                                            {cardClass.name}
                                        </Title>
                                    </Divider>
                                    <List
                                        grid={{ xs: 1, sm: 2, md: 3, lg: 4 }}
                                        size="large"
                                        dataSource={getClassHeroes(cardClass.id)}
                                        renderItem={(card: HeartStoneCard) => (
                                            card.manaCost === 0 ?
                                                <List.Item
                                                    key={card.id}
                                                >
                                                    <img alt={card.name} src={card.image} onClick={() => setSelectedClass(cardClass)} />

                                                </List.Item>
                                                : null
                                        )}
                                    />
                                </div>
                                : null
                        )
                    })}
                </div>
                : null}
        </Layout>
    )
}

export default CardClassSelector;
