import React from 'react';
import Header from '../header-component/header-component';
import Card from '../card-component/card-component';
import { withRouter } from "react-router";
import qs from "qs";
import { take } from 'rxjs/operators';
import { withRestClient } from '../services/rest-client';

import './search-results-component.css';

class SearchResultsComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { searchKeywords: "", newsList: [], isFlushed: false };
        this.onSearch.bind(this);
    }

    componentDidMount() {
        let query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).q;
        this.loadNews(query);
    }

    onSearch = (event) => {
        if(event.keyCode === 13) {
            this.props.history.push("/search?q=" + event.target.value);
            this.loadNews(event.target.value);
        }
    }

    loadNews = (query) => {
        
        this.props.restClient.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=2ef288ecdb6c4859bace45624242fcca`)
        .pipe(take(1))
        .subscribe((data) => this.setState({ newsList: data.articles }));

        this.setState({ searchKeywords: query });
    };

    openNews = (url) => {
        window.location.href = url;
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
                url={currentNews.url}
                />
              </div>);
        }
      
        return news;
      }


    render() {
        return <div className="max-container">
        <Header onSearch={this.onSearch} />
        <div className="search-title">
            {this.state.newsList.length} news found for keyword "{this.state.searchKeywords}"
            <hr />
        </div>
        <div className="max-container search-news-container">
            {this.createNews()}
        </div>
        </div>;
    }

}


export default withRestClient(withRouter(SearchResultsComponent));