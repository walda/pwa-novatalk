import React from 'react';
import Card from '../card-component/card-component';
import Slider from '../slider-component/slider-component';
import Slide from '../slider-component/slide-component';
import Header from '../header-component/header-component';
import { withRestClient } from '../services/rest-client';
import { take } from 'rxjs/operators';
import { NEWS_API_KEY, NEWS_API_URL } from '../environment';

import './main-component.css';

class MainComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { newsList: [], slides: [] }
    this.openNews.bind(this);
  }

  componentDidMount() {
    this.props.restClient.get(`${NEWS_API_URL}/top-headlines?country=us&apiKey=${NEWS_API_KEY}`)
    .pipe(take(1))
    .subscribe((data) => this.setState({ newsList: data.articles }));

    this.props.restClient.get(`${NEWS_API_URL}/top-headlines?country=us&category=sports&apiKey=${NEWS_API_KEY}`)
    .pipe(take(1))
    .subscribe((data) => this.setState({ slides: data.articles.slice(0, 3) }));
  }
  
  openNews = (url) => {
    window.location.href = url;
  }

  onSearch = (event) => {
    if(event.keyCode === 13) {
        this.props.history.push("/search?q=" + event.target.value);
    }
  };
  
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
            url={currentNews.url}
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
      <Header onSearch={this.onSearch} />
      {this.createSlides()}
      <div className="container max-container">
          {this.createNews()}
      </div>
    </div> ;
  }
}

export default withRestClient(MainComponent);
