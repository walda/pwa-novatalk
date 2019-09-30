import { from } from "rxjs/index";
import React from "react";

export default class RestClient {

    http = new XMLHttpRequest();

    get(url, headers) {
        return from(fetch(url, { method: 'GET', headers: headers })
        .then(data => this.__processResponse(data)));
    }

    post(url, body, headers) {
        return from(fetch(url, { method: 'POST', headers: headers, body: body })
        .then(data => this.__processResponse(data)));
    }

    put(url, body, headers) {
        return from(fetch(url, { method: 'PUT', headers: headers, body: body })
        .then(data => this.__processResponse(data)));
    }

    delete(url, body, headers) {
        return from(fetch(url, { method: 'DELETE', headers: headers, body: body })
        .then(data => this.__processResponse(data)));
    }

    __processResponse(data) {
        if (data.status >= 400 && data.status < 600) {
            return Promise.reject(data);
        }
        return data.json();
    }

}

export function withRestClient(WrappedComponent) {
    return class extends React.Component {

        __restClient;

        constructor(props) {
            super(props);
            this.__restClient = new RestClient();
            this.state = {
                restClient: this.__restClient
            };            
        }

        render() {
            return <WrappedComponent 
            restClient={ this.__restClient }
                {...this.props} />;
        }
    };

}