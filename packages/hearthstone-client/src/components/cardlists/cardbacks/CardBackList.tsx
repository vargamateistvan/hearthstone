import React from 'react';
import { CardBack, CardBackCard } from '../../../types/types';
import { getAllCardBacks } from '../../../utils/getCards';
import { List } from 'antd';


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
        <div>
            {cardBacks ?
                <div>
                    <List
                        grid={{ gutter: 16, column: 4 }}
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
        </div>
    )
}

export default CardBackList;
