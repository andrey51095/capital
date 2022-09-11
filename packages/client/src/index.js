import React from 'react';
import {render} from 'react-dom';
import {ApolloProvider} from '@apollo/react-hooks';
import {BrowserRouter} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider} from 'baseui';
import {ToasterContainer, PLACEMENT} from 'baseui/toast';

import App from './App';
import 'reset-css';

import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({uri: `http://127.0.0.1:${process.env.APP_SERVER_PORT || 8000}`});

const engine = new Styletron();

render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <App />
          <ToasterContainer
            autoHideDuration={5000}
            placement={PLACEMENT.topRight}
          />
        </BaseProvider>
      </StyletronProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
