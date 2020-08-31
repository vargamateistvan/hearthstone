import React from 'react';
import { Layout, Steps } from 'antd';
import { CardClass, HeartStoneCard } from '../../types/types';
import CardClassSelector from './CardClassSelector';
import DeckTypeSelector from './DeckTypeSelector';
import CardSelector from './CardSelector';
import theme from '../../theme';

const { Step } = Steps;

const DeckBuilder: React.FC = () => {
    const [currentStep, setCurrentStep] = React.useState<number>(0)
    const [selectedType, setSelectedType] = React.useState<string | null>(null);
    const [selectedClass, setSelectedClass] = React.useState<CardClass | null>(null);
    const [deck, setDeck] = React.useState<HeartStoneCard[] | null>(null);

    const steps = [
        {
            title: 'Select a deck type',
            content: 'Select a class',
        },
        {
            title: 'Select a class',
            content: 'Select a class',
        },
        {
            title: 'Build a deck',
            content: 'Build a deck',
        },
    ];


    React.useEffect(() => {
        console.log("TYPE", selectedType, "Class", selectedClass)
        if (selectedType && currentStep === 0) {
            setCurrentStep(currentStep + 1)
        }

        if (selectedClass && currentStep === 1) {
            setCurrentStep(currentStep + 1)
        }
    }, [selectedType, selectedClass, currentStep])

    return (
        <Layout style={{ backgroundColor: theme.lightBrown, color: theme.primary }}>
            <Steps current={currentStep}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>

            {currentStep === 0 ?
                <DeckTypeSelector
                    setSelectedType={setSelectedType}
                ></DeckTypeSelector> : null
            }

            {currentStep === 1 ?
                <CardClassSelector
                    setSelectedClass={setSelectedClass}
                ></CardClassSelector> : null
            }

            {currentStep === 2 ?
                <CardSelector
                    selectedType={selectedType}
                    selectedClass={selectedClass}
                    setDeck={setDeck}
                ></CardSelector> : null
            }

            {/* <div className="steps-action">
                {currentStep > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => setCurrentStep(currentStep - 1)}>
                        Previous
                    </Button>
                )}
                {currentStep < steps.length - 1 && (
                    <Button type="primary" onClick={() => setCurrentStep(currentStep + 1)}>
                        Next
                    </Button>
                )}
            </div> */}
        </Layout>
    )
}

export default DeckBuilder;
