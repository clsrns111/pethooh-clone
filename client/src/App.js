import React, { useEffect, useState } from "react";
import "./App.css";
import "@fontsource/roboto";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Nav from "./componant/Nav";
import Home from "./componant/Home";
import Register from "./componant/Register";
import Signin from "./componant/Signin";
import Auth from "./componant/Auth";
import Upload from "./componant/Upload";
import DogFood from "./componant/DogFood";
import CatFood from "./componant/CatFood";
import Detail from "./componant/Detail";
import Search from "./componant/Search";
import CatProduct from "./componant/CatProduct";
import DogProduct from "./componant/DogProduct";
import Footer from "./componant/Footer";
import Basket from "./componant/Basket";
import { GlobalSpinnerContext } from "./global";
function App() {
  return (
    <GlobalSpinnerContext.Provider>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Auth(Home, null)} />
          <Route exact path="/detail/:id" component={Auth(Detail, null)} />
          <Route exact path="/search" component={Auth(Search, null)} />
          <Route
            exact
            path="/category/dogfood"
            component={Auth(DogFood, null)}
          />
          <Route
            exact
            path="/category/catfood"
            component={Auth(CatFood, null)}
          />
          <Route
            exact
            path="/category/catproduct"
            component={Auth(CatProduct, null)}
          />
          <Route
            exact
            path="/category/dogproduct"
            component={Auth(DogProduct, null)}
          />
          <Route exact path="/signin" component={Auth(Signin, false)} />
          <Route exact path="/register" component={Auth(Register, false)} />
          <Route exact path="/upload" component={Auth(Upload, true, true)} />
          <Route exact path="/basket" component={Auth(Basket, true)} />
        </Switch>
        <Footer />
      </Router>
    </GlobalSpinnerContext.Provider>
  );
}

export default App;
