import React from 'react';
import ReactDOM from 'react-dom';
import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/scss/argon-design-system-react.scss?v1.1.0";
import "./assets/css/poketrade/index.css";
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Navbar, NavbarBrand } from "reactstrap";

ReactDOM.render(
  <React.StrictMode>
    <Navbar className="navbar-horizontal navbar-dark bg-default pt-4 pb-4 mb-3" expand="lg">
      <NavbarBrand className="ml-3" href="#" onClick={e => e.preventDefault()}>
        <img src={require('./assets/img/brand/logo.png')} />
      </NavbarBrand>
    </Navbar>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
