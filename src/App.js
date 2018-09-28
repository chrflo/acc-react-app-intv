import React, { Component } from "react";
import { Provider } from "react-redux"; //wraps around everything and provides our app the store

// add the style
import "./App.css";

// add the components
import Dashboard from "./_components/_layout/Dashboard";
import Navbar from "./_components/_layout/Navbar";
import Footer from "./_components/_layout/Footer";

// bring in the redux components
import store from "./_store/store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Navbar />
          <Dashboard />
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;
