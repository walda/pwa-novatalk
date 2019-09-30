import React from 'react';

import './slider-component.css';

export default class Slider extends React.Component {
    
    counter = 0;

    constructor(props) {
        super(props);
        console.log(props);
        this.state = { currentSlide: this.props.slides[0] || [], slides: this.props.slides };
        this.intervalId = setInterval(() => {
            this.counter++;
            this.showNextImage();
        }, 5000);
    }

    showSlide(slideNumber) {
        this.counter = slideNumber;
        this.showNextImage();
        clearInterval(this.intervalId);
    }

    showNextImage() {
        this.setState({ currentSlide: this.props.slides[this.counter % this.props.slides.length] });
    }

    createButtons() {
        const buttons = [];
        for(let i=0; i < this.props.slides.length; i++) {
            const style = this.counter % this.props.slides.length === i 
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
