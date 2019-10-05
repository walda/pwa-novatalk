import React from 'react';

import './slider-component.css';

export default class Slider extends React.Component {
    
    counter = 0;

    constructor(props) {
        super(props);
        this.state = { currentSlide: this.props.children[0].props };
        this.intervalId = setInterval(() => {
            this.counter++;
            this.showNextImage();
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    showSlide(slideNumber) {
        this.counter = slideNumber;
        this.showNextImage();
        clearInterval(this.intervalId);
    }

    showNextImage() {
        this.setState({ currentSlide: this.props.children[this.counter % this.props.children.length].props });
    }

    createButtons() {
        const buttons = [];
        for(let i=0; i < this.props.children.length; i++) {
            const style = this.counter % this.props.children.length === i 
                                ? "slider-buttons active" : "slider-buttons inactive";
            buttons.push(<div id={i} key={i} className={style} onClick={() => this.showSlide(i)} ></div>);
        }
        return buttons
    }

    render() {
        return <div>
                <div className="slider-component">
                    <img src={this.state.currentSlide.urlToImage} alt="Alt" />
                    <div className="slider-header">
                        {this.state.currentSlide.title}
                    </div>
                </div> 
                <div className="slider-footer">
                    <div className="slider-buttons-container">
                        {this.createButtons()}
                    </div>
                </div>
        </div>;
    }

}
