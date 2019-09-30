import React from 'react';
import './card-component.css';

export default class Card extends React.Component {


    _onClick = () => {
        this.props.click("aaa");
    } 

    render() {
        return <div className="card-container" onClick={this._onClick}>
                    <div className="card-article-image">
                        <img src={this.props.image} alt={this.props.alt.substring(1, 20)} />
                    </div>
                    <div className="card-article-header text">
                        {this.props.text}
                    </div>
                </div>;
    }

}