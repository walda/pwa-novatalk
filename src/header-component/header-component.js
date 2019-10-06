import React from 'react';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom'

import './header-component.css';

class Header extends React.Component {

    _onChange = (event) => {
        this.setState({ searchText: event.target.value });
    };

    render() {
        return <div className="header-container">
            <div className="header-title">
                <Link to="/">
                    <img src="http://www.bluetab.net/wp-content/themes/bluetab/images/menu-header/main-menu-logo.png" alt="Bluetab" /> News
                </Link>
            </div>
            <div className="header-input">
                <input defaultValue={this.props.searchText} type="text" placeholder="Search ..." onKeyDown={this.props.onSearch} />
                </div>            
        </div>;
    } 
}

export default withRouter(Header);