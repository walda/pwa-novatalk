import React from 'react';

import './header-component.css';

export default class Header extends React.Component {


    render() {
        return <div className="search-container">
            <div className="search-title">
                <img src="http://www.bluetab.net/wp-content/themes/bluetab/images/menu-header/main-menu-logo.png" alt="Bluetab" /> News
            </div>
            <div className="search-input"><input type="text" placeholder="Search ..." /></div>            
        </div>;
    } 

}