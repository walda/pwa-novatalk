import React from 'react';
import Header from '../header-component/header-component';
import Card from '../card-component/card-component';
import { withRouter } from "react-router";
import qs from "qs";
import { take } from 'rxjs/operators';
import { withRestClient } from '../services/rest-client';
import { NEWS_API_KEY, NEWS_API_URL } from '../environment';

import './search-results-component.css';

const SEARCHING = "Searching ...";

class SearchResultsComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { searchKeywords: "", newsList: [], isSearching: true };
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
        
        this.props.restClient.get(`${NEWS_API_URL}/everything?q=${query}&apiKey=${NEWS_API_KEY}`)
        .pipe(take(1))
        .subscribe((data) => this.setState({ newsList: data.articles, isSearching: false }));

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

    renderSearchMessage() {
        return this.state.isSearching ?
            SEARCHING
            :
            `${this.state.newsList.length} news found for keyword "${this.state.searchKeywords}"`;
    }


    render() {
        return <div className="max-container">
        <Header onSearch={this.onSearch} searchText={this.state.searchKeywords} />
        <div className="search-title">
            {this.renderSearchMessage()}
            <hr />
        </div>
        <div className="max-container search-news-container">
            {this.createNews()}
        </div>
        </div>;
    }

}


export default withRestClient(withRouter(SearchResultsComponent));