import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/tailwind.css';
import App from './App';
import { Provider } from 'react-redux';
import Store from "./redux/store/index";
import { ColorModeScript } from "@chakra-ui/color-mode";
import theme from "./theme";

ReactDOM.render(
  <Provider store={Store}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
       <App />
  </Provider>

,
  document.getElementById('root')
);

