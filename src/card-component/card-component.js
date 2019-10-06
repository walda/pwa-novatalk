import React from 'react';
import './card-component.css';

const MAXIMUN_TITLE_LENGTH = 85;

export default class Card extends React.Component {


    _onClick = () => {
        this.props.click(this.props.url);
    }

    _ellipsis = (text) => {
        return text.length > MAXIMUN_TITLE_LENGTH ? text.substring(0,MAXIMUN_TITLE_LENGTH) + " ..." : text;
    };

    render() {
        return <div className="card-container" onClick={this._onClick}>
                    <div className="card-article-image">
                        <img src={this.props.image} alt={this.props.alt.substring(0, 20)} />
                    </div>
                    <div className="card-article-header text">
                        {this._ellipsis(this.props.text)}
                    </div>
                </div>;
    }

}