import React, { Component } from "react";

import "./App.css";
import Dashboard from "./_components/_layout/Dashboard";
import Navbar from "./_components/_layout/Navbar";
import Footer from "./_components/_layout/Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Dashboard />
        <Footer />
      </div>
    );
  }
}

export default App;
