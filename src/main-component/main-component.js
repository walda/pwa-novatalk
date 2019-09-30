import React from 'react';
import Card from '../card-component/card-component';
import Slider from '../slider-component/slider-component';
import Slide from '../slider-component/slide-component';
import Header from '../header-component/header-component';
import { withRestClient } from '../services/rest-client';
import { take } from 'rxjs/operators';

import './main-component.css';

class MainComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { newsList: [], slides: [] }
  }

  componentDidMount() {
    // this.props.restClient.get("http://localhost:4000/v2/everything?q=bitcoin&from=2019-08-24&sortBy=publishedAt&apiKey=2ef288ecdb6c4859bace45624242fcca")
    this.props.restClient.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=2ef288ecdb6c4859bace45624242fcca")
    .pipe(take(1))
    .subscribe((data) => this.setState({ newsList: data.articles }));

    this.props.restClient.get("https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=2ef288ecdb6c4859bace45624242fcca")
    .pipe(take(1))
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

  createSlides() {
    let slides = [];

    for(let i=0; i < this.state.slides.length; i++) {
      slides.push(<Slide key={i} urlToImage={this.state.slides[i].urlToImage} title={this.state.slides[i].title} />);
    }

    return slides.length > 0 ? <Slider>{slides}</Slider> : <div></div>;
  }


  render() {
      return <div className="max-container">
      <Header />
      {this.createSlides()}
      <div className="container max-container">
          {this.createNews()}
      </div>
    </div> ;
  }
}

export default withRestClient(MainComponent);
