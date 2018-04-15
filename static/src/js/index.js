import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import App from "dokkin/js/app"
import configureStore from 'dokkin/js/configure-store'
import { preload } from "dokkin/js/utils/image-preloader";

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

preload();