import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
// setup fake backend
import { configureFakeBackend, store } from "./helpers";
import { App } from "./containers/App";
import { ApolloProvider } from "@apollo/react-hooks";
import { apollo } from "./services/external.service";
import * as serviceWorker from "./serviceWorker";
import "react-virtualized/styles.css";

configureFakeBackend();

render(
    <ApolloProvider client={apollo}>
        <Provider store={store}>
            <App />
        </Provider>
    </ApolloProvider>,
    document.getElementById("app")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
