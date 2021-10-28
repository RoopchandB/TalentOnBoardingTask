import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";

import "./custom.css";
import GetCustomers from "./components/Customers/GetCustomers";
import GetProducts from "./components/Products/GetProducts";
import GetStores from "./components/Stores/GetStores";
import GetSales from "./components/Sales/GetSales";
export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route exact path="/GetCustomers" component={GetCustomers} />
        <Route exact path="/GetProducts" component={GetProducts} />
        <Route exact path="/GetStores" component={GetStores} />
        <Route exact path="/GetSales" component={GetSales} />
      </Layout>
    );
  }
}
