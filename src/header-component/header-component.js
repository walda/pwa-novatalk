import React from 'react';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom'

import './header-component.css';

class Header extends React.Component {

    render() {
        return <div className="header-container">
            <div className="header-title">
                <Link to="/">
                    <img src="http://www.bluetab.net/wp-content/themes/bluetab/images/menu-header/main-menu-logo.png" alt="Bluetab" /> News
                </Link>
            </div>
            <div className="header-input">
                <input type="text" placeholder="Search ..." onKeyDown={this.props.onSearch} />
                </div>            
        </div>;
    } 
}

export default withRouter(Header);