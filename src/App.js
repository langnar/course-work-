import React, { Component } from "react";
import "./App.css";
import List from "./containers/List";
import Form from "./containers/Form";
import Search from "./containers/Search";
import { Provider } from "react-redux";
import storeCreator from "./store";

const store = storeCreator();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="header">
            <div className='container'>
            <div className="header-content">
            <Form />
              <div className="search">
                <Search searchField="title"/>
                <Search searchField="tags"/>
              </div>
              </div>
             </div>
          </div>
            <div className="main">
              <div className='container'>
                <div className="main-content">
                  <List />
                </div>
              </div>
            </div>
        </div>
      </Provider>
    );
  }
}

export default App;
