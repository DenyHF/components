import * as React from 'react';
import './ExtFancyButton.scss';

interface IFancyParagraphProps {
    children: React.ReactChildren;
}

interface IFancyParagraphState {
    backgroundColor: string;
    color: string;
}

class ExtFancyParagraph extends React.PureComponent<IFancyParagraphProps, IFancyParagraphState> {
    constructor(props: IFancyParagraphProps) {
        super(props);

        this.state = {
            backgroundColor: 'black',
            color: 'white'
        };
    }

    public onButtonClick = () => {
        const isBlack = this.state.backgroundColor === 'black';
        this.setState({
            backgroundColor: isBlack ? 'white' : 'black',
            color: isBlack ? 'black' : 'white'
        });
    }

    public render() {
        const { children } = this.props;
        const {backgroundColor, color} = this.state;

        const button = React.cloneElement(children[0], {
            className: 'fancy-paragraph__button',
            onClick: this.onButtonClick
        });

        const text = React.Children.toArray(children).slice(1);

        return (
            <div className={'fancy-paragraph'} style={{ backgroundColor, color }}>
                {button}
                <p className={'fancy-paragraph__text-container'}>
                    {text}
                </p>
            </div>
        );
    }
}

export default ExtFancyParagraph;
