import React from 'react';
import Card from '../card-component/card-component';
import Slider from '../slider-component/slider-component';
import Search from '../search-component/search-component';
import { withRestClient } from '../services/rest-client';

import './main-component.css';

class MainComponent extends React.Component {

 images = [
    "https://www.newsbtc.com/wp-content/uploads/2019/09/xrp-crypto-ripple-bitcoin-shutterstock_1269853480-1200x780.jpg",
    "https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2019/09/19/15689242817112.jpg",
    "https://static.coindesk.com/wp-content/uploads/2019/08/Brendan-Blumer-Option-1-e1569425778122.jpg"
  ];

  constructor(props) {
    super(props);
    this.state = { newsList: [], slides: [] }
  }

  componentDidMount() {
    // this.props.restClient.get("http://localhost:4000/v2/everything?q=bitcoin&from=2019-08-24&sortBy=publishedAt&apiKey=2ef288ecdb6c4859bace45624242fcca")
    this.props.restClient.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=2ef288ecdb6c4859bace45624242fcca")
    .subscribe((data) => this.setState({ newsList: data.articles }));

    this.props.restClient.get("https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=2ef288ecdb6c4859bace45624242fcca")
    .subscribe((data) => this.setState({ slides: data.articles.slice(0, 3) }));
  }
  
  openNews(url) {
    console.log("Open " + url);
  }
  
  createNews() {    
    let news = [];

    for (let i=0; i < this.state.newsList.length; i++) {
      const currentNews = this.state.newsList[i];
      news.push(
        <div className="item" key={i}>
          <Card
            click={this.openNews}
            image={currentNews.urlToImage}
            text={currentNews.title}
            alt={currentNews.title}
            />
          </div>);
    }
  
    return news;
  }

  render() {
      return <div className="max-container">
      <Search />
      <Slider slides={this.state.slides} />
      <div className="container max-container">
          {this.createNews()}
      </div>
    </div> ;
  }
}

export default withRestClient(MainComponent);
