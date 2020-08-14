import React from 'react';
import { CardBack, CardBackCard } from '../../../types/types';
import { getAllCardBacks } from '../../../utils/getCards';
import { List, Layout } from 'antd';


const CardBackList: React.FC = () => {
    const [cardBacks, setCardBacks] = React.useState<CardBack | null>(null)

    const getCardBacks = React.useCallback(async () => {
        const result = await getAllCardBacks();
        if (result) setCardBacks(result);
    }, []);

    React.useEffect(() => {
        getCardBacks();
    }, [getCardBacks])

    return (
        <Layout>
            {cardBacks ?
                <div>
                    <List
                        grid={{ xs: 1, sm: 2, md: 3, lg: 4 }}
                        size="large"
                        dataSource={cardBacks.cardBacks}
                        renderItem={(cardBack: CardBackCard) => (
                            <List.Item
                                key={cardBack.id}
                            >
                                <img alt={cardBack.name} src={cardBack.image} />
                            </List.Item>
                        )}
                    />
                </div>
                : null
            }
        </Layout>
    )
}

export default CardBackList;
